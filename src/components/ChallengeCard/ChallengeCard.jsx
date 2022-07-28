import { Link, Route, Routes } from "react-router-dom";
import ChallengesDetail from "../ChallengesDetail/ChallengesDetail";
import "./ChallengeCard.scss";
import { useDispatch, useSelector } from "react-redux";
import { postDetail } from "../../redux/post/post.actions";

const ChallengeCard = ({ challenge }) => {
  let user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch()
  console.log();
  return (
    <>
      <Routes><Route path="/challengedetails" element={<ChallengesDetail challenge={challenge}/>}/></Routes>
      <h2>{challenge.title}</h2>
      <h3 className='challenge-card__level'>
        Challenge level : 0{challenge.level}
      </h3>
      <h4>{challenge.description}</h4>
      { user &&
        <Link onClick={() => {dispatch(postDetail(challenge))}} to={`${challenge.id}`}>Read more</Link>
      }
      {
        !user &&
        <p>Log in to access</p>
      }
    </>
  );
};

export default ChallengeCard;
