import "./App.scss";
import { Header, Footer, ChallengesDetail, RequireAuth, } from "./components";
import LanguagePage from "./pages/LanguagePage/LanguagePage";
import Auth from "./pages/Auth/Auth";
import Manager from "./pages/Manager/Manager";
import { Routes, Route } from "react-router-dom";



function App() {
  
  return (
    <>
      <Header />
      <Routes>
        <Route 
          path='/:language/:type/:id' 
          element={<RequireAuth><ChallengesDetail /></RequireAuth>}
        />
        <Route path='/' element={<LanguagePage language='htmlCss' />} />
        <Route
          path='/htmlcss/*'
          element={<LanguagePage language='htmlcss' />}
        />
        <Route
          path='/javascript/*'
          element={<LanguagePage language='javascript' />}
        />
        <Route path='/react/*' element={<LanguagePage language='react' />} />
        <Route
          path='/angular/*'
          element={<LanguagePage language='angular' />}
        />
        <Route path='/manager/*' element={<RequireAuth><Manager /></RequireAuth>} />
        <Route path='/auth/*' element={<Auth />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
