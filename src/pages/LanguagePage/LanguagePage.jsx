import "./LanguagePage.scss";
import { Routes, Route } from "react-router-dom";
import ResourcesList from "../../components/ResourcesList/ResourcesList";
import ChallengesList from "../../components/ChallengesList/ChallengesList";
import NavSelect from "../../components/nav-select/Nav-select";
import { postLanguage } from "../../redux/post/post.actions";
import { useDispatch } from "react-redux";

const LanguagePage = ({ language }) => {

  const dispatch = useDispatch();
  dispatch(postLanguage(language));
  console.log('language', language);

  return (
    <>
      <NavSelect language={language} linkResources={`/${language}/resources`} linkChallenges={`/${language}/challenges`}/>

      <Routes>
        <Route path='/' element={<ResourcesList language={language} />}></Route>
        <Route
          path='/resources'
          element={<ResourcesList language={language} />}
        ></Route>
        <Route
          path='/challenges/*'
          element={<ChallengesList language={language} />}
        ></Route>
      </Routes>
    </>
  );
};

export default LanguagePage;
