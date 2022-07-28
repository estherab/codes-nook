import { useState } from "react";
import useApiJson from "../../hooks/apiJson.hook";

import "./ManagerChallenge.scss";

const INITIAL_STATE = {
  title: "",
  level: "",
  description: "",
  requeriments: "",
  date: "",
  solutions: [],
};

const ManagerChallenge = () => {
  const ApiJson = useApiJson();
  const [state, setState] = useState(INITIAL_STATE);
  const [category, setCategory] = useState("htmlcss");

  const submitForm = (ev) => {
    ev.preventDefault();
    // setState({ ...state, requeriments: state.requeriments.split(/\r?\n/) });
    let copyState = state;
    copyState.requeriments = copyState.requeriments.split(/\r?\n/);
    ApiJson.postCategory(category, "challenges", copyState);
  };

  return (
    <>
      <div className='challenge__container'>
        <h1>Upload a Challenge</h1>
        <form onSubmit={submitForm}>
          <div className='top'>
            <div className='top__name'>
              <label>Title*</label>
              <input
                type='text'
                placeholder='Name of the challenge...'
                required
                value={state.title}
                name='title'
                onChange={(ev) =>
                  setState({ ...state, [ev.target.name]: ev.target.value })
                }
              />
            </div>

            <div className='top__category'>
              <label>Level*</label>
              <input
                type='text'
                placeholder='Level of the challenge...'
                required
                value={state.level}
                name='level'
                onChange={(ev) =>
                  setState({ ...state, [ev.target.name]: ev.target.value })
                }
              />
            </div>
          </div>
          <div className='top'>
            <div className='top__name'>
              <label>End date*</label>
              <input
                type='text'
                placeholder='DD/MM/YYYY'
                required
                value={state.date}
                name='date'
                onChange={(ev) =>
                  setState({ ...state, [ev.target.name]: ev.target.value })
                }
              />
            </div>
            <div className='top__category'>
              <label>Category*</label>
              <select
                defaultValue={{ value: "htmlcss" }}
                required
                value={category}
                name='category'
                onChange={(ev) => setCategory(ev.target.value)}
              >
                <option value='htmlcss' selected>
                  HTML/CSS
                </option>
                <option value='javascript'>Javascript</option>
                <option value='angular'>Angular</option>
                <option value='react'>React</option>
              </select>
            </div>
          </div>
          <div className='mid'>
            <label>Description*</label>
            <input
              type='text'
              placeholder='Place a description of the challenge...'
              required
              value={state.description}
              name='description'
              onChange={(ev) =>
                setState({ ...state, [ev.target.name]: ev.target.value })
              }
            />
          </div>
          <div className='bottom'>
            <label>Requeriments*</label>
            <textarea
              placeholder='One per line...'
              required
              value={state.requeriments}
              name='requeriments'
              onChange={(ev) =>
                setState({ ...state, [ev.target.name]: ev.target.value })
              }
            />
          </div>
          <div className='button__container'>
            <button className='button__primary' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ManagerChallenge;
