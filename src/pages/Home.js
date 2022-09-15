import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import SurahButton from "../componenets/SurahButton";
const Home = () => {
  const [ayahs, setAyahs] = useState([]);
  const [translation, setTranslation] = useState([]);
  const [type, setType] = useState([]);
  const [englishN, setEnglishN] = useState([]);
  const [surahs, setSurahs] = useState([]);
  const [number, setNumber] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const getSurahs = () => {
    axios({
      method: "GET",
      url: `http://api.alquran.cloud/v1/surah`,
    })
      .then((response) => {
        setSurahs(response.data.data.map((surah) => surah.name));
        setType(response.data.data.map((surah) => surah.revelationType));
        setEnglishN(response.data.data.map((surah) => surah.englishName));
        setTranslation(
          response.data.data.map((surah) => surah.englishNameTranslation)
        );
        setAyahs(response.data.data.map((surah) => surah.numberOfAyahs));
        setNumber(response.data.data.map((surah) => surah.number));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getSurahs();
    loading ? setLoading(false) : <text>loading</text>;
  }, [loading]);
  return (
    <div className="main">
      {surahs.map((surah, i) => (
        <SurahButton
          onClick={() => {
            navigate("surah", { state: { surah: surah, number: number[i] } });
          }}
          surah={surah}
          type={type[i]}
          eName={englishN[i]}
          translation={translation[i]}
          ayahs={ayahs[i]}
          key={i}
          number={number[i]}
        />
      ))}
    </div>
  );
};

export default Home;
