import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import ManagerChallenge from "../../components/ManagerChallenge/ManagerChallenge";
import ManagerResources from "../../components/ManagerResources/ManagerResources";
import NavSelect from "../../components/nav-select/Nav-select";

import "./Manager.scss";

const Manager = () => {

  let admin = useSelector((state) => state.auth.admin);

  return (
    <>
      { admin && 
      <div>
        <NavSelect 
          linkResources={`/manager/resources`}
          linkChallenges={`/manager/challenges`}
        />
      </div>
      }
      <div className='form__container'>
        <Routes>
          <Route path='/' element={<ManagerResources />} />
          <Route path='/resources' element={<ManagerResources />} />
          { admin &&
            <Route path='/challenges' element={<ManagerChallenge />} />
          }
        </Routes>
      </div>
    </>
  );
};

export default Manager;
