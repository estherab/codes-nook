import React, { useEffect, useState } from "react";
import "./ChallengeForm.scss";
import useApiJson from "../../../hooks/apiJson.hook";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const INITIAL_STATE = {
  suscribe: false,
  upload: false,
  suscribed: false,
  toRate: false,
  result: false,
};

const INITIAL_SELECT = {
  title: "",
  user: "",
  link: "",
  repository: "",
  rates: "",
};
const INITIAL_TIMER = {
  hour: 0,
  min: 0,
  sec: 0,
};

const twoDigits = (n) => {
  return n > 9 ? "" + n : "0" + n;
};

function ChallengeForm({ post, emailPlayer, isRatingParent }) {

  let { solutions, id } = post;
  const { language} = useParams();
  const ApiJson = useApiJson();
  const [solutionsLocal, setSolutionLocal] = useState(solutions);
  const [state, setState] = useState(INITIAL_STATE);
  let user = useSelector((state) => state.auth.user);
  if (!user) {user = ''} else { user = user.email}
  const [form, setForm] = useState({
    link: "",
    repository: "",
    user: user,
  });
  const [selected, setSelected] = useState(INITIAL_SELECT);
  const [timer, setTimer] = useState(INITIAL_TIMER);


  const compareAndSetDate = () => {
    let dateObject = post.date.split("/").reverse().join("/");
    dateObject = new Date(dateObject);
    const dateNow = Date.now();
    const differenceDates = (dateObject.getTime() - dateNow) / 1000;
    let newTime;

    if (differenceDates > 0) {
      newTime = {
        hour: Math.floor(differenceDates / 3600),
        min: Math.floor((differenceDates % 3600) / 60),
        sec: Math.floor((differenceDates % 3600) % 60),
      };
      setTimer(newTime);
    } else {
      if (!(INITIAL_TIMER === newTime)) {
        newTime = INITIAL_TIMER;
        setTimer(INITIAL_TIMER);
      }
    }
    return newTime;
  };


  const allIsRated = () => {
    let allIsRated = true;
    solutionsLocal.forEach((solution) => {
      if (!("rates" in solution)) allIsRated = false;
    });
    if (allIsRated)
      setState({ ...state, result: true, suscribe: false, toRate: false });
  };


  const selectBestSolution = () => {
    const selectedProject = solutionsLocal.sort((a, b) => {
      return a.rates - b.rates;
    });
    selectedProject.reverse();
    setSelected(selectedProject[0]);
  };


  const timeFinish = (timer) => {
    if (INITIAL_TIMER === timer && solutionsLocal.length !== 0) {
      setState({ ...state, upload: false, toRate: true, suscribe: false });

      allIsRated();
      selectBestSolution();
    } else {
      setState({ ...state, suscribe: true });
    }
  };


  useEffect(() => {
    setState(INITIAL_STATE);
    setSolutionLocal(solutions);
    let timer = compareAndSetDate();
    if (post.date !== "00/0/0000") {
      const intervalTimer = window.setInterval(function () {
        compareAndSetDate();
      }, 1000);
    }
    timeFinish(timer);
  }, [post, solutionsLocal]);
  

  useEffect(() => {
    isRatingParent(state.toRate);
  }, [state]);


  const submitForm = (ev) => {
    ev.preventDefault();
    ApiJson.postSolution(language, id, form);
    setState({ ...state, suscribe: true, upload: false, suscribed: true });
  };


  const score = (ev) => {
    const newRate = Number(ev.target.innerText);
    const solutionsMaped = solutionsLocal.map((solution) => {
      if (solution.user === emailPlayer) solution.rates = newRate;
      return solution;
    });
    setSolutionLocal(solutionsMaped);
    selectBestSolution();
    allIsRated();
    ApiJson.postRate(language, id, emailPlayer, newRate);
  };


  return (
    <>
      {state.suscribe && (
        <>
          <div className='timer'>
            <div className='timer__wrapper'>
              <span className='display__01 timer__number'>{twoDigits(timer.hour)}</span>
              <span className='timer__name'>hour/s</span>
            </div>
            <div className='timer__wrapper'>
              <span className='display__01 timer__number'>{twoDigits(timer.min)}</span>
              <span className='timer__name'>min/s</span>
            </div>
            <div className='timer__wrapper'>
              <span className='display__01 timer__number'>{twoDigits(timer.sec)}</span>
              <span className='timer__name'>sec/s</span>
            </div>
          </div>
          {!state.suscribed && (
            <button
              onClick={() => {
                setState({ ...state, suscribe: false, upload: true });
              }}
              className='button__primary button__primary-end'
            >Suscribe
            </button>
          )}
        </>
      )}
      {state.upload && (
        <>
          <p className='display__01'>¡Go!</p>
          <form className='upload-form' onSubmit={submitForm}>
            <div className='upload-form__wrapper'>
              <label className='upload-form__label' htmlFor='link'>Url live server *</label>
              <input
                className='upload-form__input'
                type='url'
                name='link'
                placeholder='Like Vercel, Heroku, Digital Ocean...'
                value={form.link}
                onChange={(ev) =>
                  setForm({ ...form, [ev.target.name]: ev.target.value })
                }
                pattern="^(http(s)?:\/\/)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$"
                required
              />
            </div>
            <div className='upload-form__wrapper'>
              <label className='upload-form__label' htmlFor='repository'>Url repository *</label>
              <input
                className='upload-form__input'
                type='url'
                name='repository'
                placeholder='Like Github, Gitlab...'
                value={form.repository}
                onChange={(ev) =>
                  setForm({ ...form, [ev.target.name]: ev.target.value })
                }
                pattern="^(http(s)?:\/\/)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$"
                required
              />
            </div>
            <button type='submit' className='button__primary'>
              Upload
            </button>
          </form>
        </>
      )}
      {state.toRate && (
        <>
          <div className='toRate__info'>
            <p>You should consider</p>
            <ul>
              <li>Must-haves (2 point)</li>
              <li>Clean Code (1 point)</li>
              <li>Functionality (1 point)</li>
              <li>Performance (1 point)</li>
            </ul>
          </div>
          { !emailPlayer &&
            <h2 className='toRate__title'>Select a project to rate it</h2>
          }
          { emailPlayer &&
            <div className='toRate__form'>
              <h2 className='toRate__form-intro'>Rate {emailPlayer}</h2>
              <span onClick={score} className='display__01 toRate__score'>1</span>
              <span onClick={score} className='display__01 toRate__score'>2</span>
              <span onClick={score} className='display__01 toRate__score'>3</span>
              <span onClick={score} className='display__01 toRate__score'>4</span>
              <span onClick={score} className='display__01 toRate__score'>5</span>
            </div>
          }
        </>
      )}
      {state.result && (
        <>
          <p className='result__intro'>Best Qualified Result</p>
          <h2 className='display__02 result__title'>{selected.user}</h2>
          <div>
            <a class='link-post result__link' href={selected.link}>Link to web</a>
            <a class='link-post result__link' href={selected.repository}>Repository</a>
          </div>
        </>
      )}
    </>
  );
}

export default ChallengeForm;
