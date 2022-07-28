import "./ChallengesDetail.scss";
import ChallengeForm from "./ChallengeForm/ChallengeForm";
import CardlistPlayers from "../Cardlist-players/Cardlist-players";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useApiJson from "../../hooks/apiJson.hook";
import { useEffect, useState } from "react";


const INITIAL_POST = {
  id: 0,
  date: "00/0/0000",
  title: "",
  description: "",
  level: 0,
  requeriments: [],
  solutions: [],
};


function ChallengesDetail({}) {

  const ApiJson = useApiJson();
  const { language, type, id } = useParams();
  const [postData, setPostData] = useState(INITIAL_POST);
  const [emailPlayer, setEmailPlayer] = useState('');
  const [isRating, setIsRating] = useState(false);
  const postByLink = useSelector((state) => state.post);


  const downloadPost = async () => {
    const post = await ApiJson.getPost(language, type, id);
    setPostData(post.data);
  };


  useEffect(() => {
    postByLink.post ? setPostData(postByLink.post) : downloadPost();
  }, []);


  useEffect(() => {
    console.log("post2", postData);
  }, [postData]);


  const recibirDeHeaderHandle = (valor) => {
    setEmailPlayer(valor)
  };

  const isRatingHandle = (value) => {
    setIsRating(value);
  }


  return (
    <main className='challengeDetail'>
      <div className='challengeDetail__content col-50'>
        <h1 className='challengeDetail__title'>{postData.title}</h1>
        <h2 className='challengeDetail__level'>
          Challenge level: {postData.level}
        </h2>
        <p className='challengeDetail__description'>{postData.description}</p>
        <h2>Requeriments</h2>
        <ul className='challengeDetail__requeriments'>
          {postData.requeriments.map((requeriment) => {
            console.log(postData);
            return (
              <li className='challengeDetail__requeriment'>{requeriment}</li>
            );
          })}
        </ul>
      </div>
      <div className='challengeDetail__form col-50'>
        <ChallengeForm post={postData} emailPlayer={emailPlayer} isRatingParent={isRatingHandle}/>
      </div>
      { isRating &&
        <CardlistPlayers
          post={postData}
          recibirDeHeaderParent={recibirDeHeaderHandle}
        />
      }
    </main>
  );
}

export default ChallengesDetail;
