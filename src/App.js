import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar/NavBar";
import Search from "./pages/Search";
import Home from "./pages/Home";
import Reccomendations from "./pages/Reccomendations";
import SurahPage from "./componenets/SurahPage";
import Juz from "./pages/Juz";
import JuzPage from "./componenets/JuzPage";
import AyahPage from "./pages/AyahPage";
const App = () => {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/reccomendations" element={<Reccomendations />} />
          <Route path="/search" element={<Search />} />
          <Route path="/surah" element={<SurahPage />} />
          <Route path="/Juz's" element={<Juz />} />
          <Route path="/JuzPage" element={<JuzPage />} />
          <Route path="/AyahPage" element={<AyahPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
