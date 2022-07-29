import "./ChallengesList.scss";
import ChallengeCard from "../ChallengeCard/ChallengeCard";
import { useEffect } from "react";
import useApiJson from "../../hooks/apiJson.hook";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { postDetail } from "../../redux/post/post.actions";

const compareDates = (date1, date2) => {
  let minor = false;
  date1 = date1.split("/");
  date2 = date2.split("/");
  console.log(date1, date2);

  if (Number(date1[1]) < Number(date2[1])) {
    minor = true;
    console.log("1");
  } else if (
    Number(date1[1]) === Number(date2[1]) &&
    Number(date1[0]) < Number(date2[0])
  ) {
    minor = true;
    console.log("2");
  }

  return minor;
};

const getCurrent = (category) => {
  const today = new Date();
  today.setHours(0, 0, 0);

  const todayString =
    today.getDate() +
    "/" +
    Number(today.getMonth() + 1) +
    "/" +
    "20" +
    today.getYear().toString().substring(1, 3);

  const currentChallenge = category.filter((challenge) => {
    console.log(challenge.date);
    return compareDates(todayString, challenge.date);
  });

  const limit = currentChallenge[0].date.split("/");
  const limitDate = new Date(limit[2], limit[1] - 1, limit[0]);

  const difference = Math.ceil(
    (limitDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
  );

  return [currentChallenge[0], difference];
};

const ChallengesList = ({ language }) => {
  let user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const ApiJson = useApiJson();
  const [newCategory, setCategory] = useState([]);
  const [difference, setDifference] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState([]);

  const uploadCategory = async () => {
    const category = await ApiJson.getCategory(language, "challenges");
    setCategory(category.data);

    const current = getCurrent(category.data);
    console.log("current", current);
    setCurrentChallenge(current[0]);
    setDifference(current[1]);

    console.log("newCategory", newCategory);
  };

  useEffect(() => {
    uploadCategory();
  }, [language]);

  return (
    <>
      <h1 className='challenges-title'>May the force be with you</h1>
      { currentChallenge.title && <div className='current'>
        <div className='current__time'>
          <p className='accent'>Quedan</p>
          <p className='current__time-diference'>{difference}</p>
          <p className='accent'>días</p>
        </div>
        <div className='current__info'>
          <h2>{currentChallenge.title}</h2>
          <p className='current__info-level'>
            Challenge level : 0{currentChallenge.level}
          </p>
          <p>{currentChallenge.description}</p>
          { user &&
          <Link
            onClick={() => {dispatch(postDetail(currentChallenge))}}
            to={`${currentChallenge.id}`}
          >
            Suscribe
          </Link>
          }
          { !user && 
            <p>Log in to access</p>
          }
        </div>
      </div> }

      <div className='challenges-container'>
        {newCategory
          .filter((challenge) => challenge !== currentChallenge)
          .map((item, index) => (
            <div
              className='challenge-card'
              key={`${JSON.stringify(item)}-${index}`}
            >
              <ChallengeCard challenge={item} language={language} />
            </div>
          ))}
      </div>
    </>
  );
};

export default ChallengesList;
