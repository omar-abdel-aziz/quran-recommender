import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SurahButton from "./SurahButton";
import "./JuzPage.css";
const JuzPage = () => {
  const [ayahs, setAyahs] = useState([]);
  const [translation, setTranslation] = useState([]);
  const [type, setType] = useState([]);
  const [englishN, setEnglishN] = useState([]);
  const [surahs, setSurahs] = useState([]);
  const [number, setNumber] = useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const n = location.state.number;
  const getJuz = () => {
    axios({
      method: "GET",
      url: `http://api.alquran.cloud/v1/juz/${n}`,
    })
      .then((response) => {
        setNumber(
          Object.values(response.data.data.surahs).map((surah) => surah.number)
        );
        setSurahs(
          Object.values(response.data.data.surahs).map((surah) => surah.name)
        );
        setAyahs(
          Object.values(response.data.data.surahs).map(
            (surah) => surah.numberOfAyahs
          )
        );
        setTranslation(
          Object.values(response.data.data.surahs).map(
            (surah) => surah.englishNameTranslation
          )
        );
        setEnglishN(
          Object.values(response.data.data.surahs).map(
            (surah) => surah.englishName
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getJuz();
    loading ? setLoading(false) : <text>loading</text>;
  }, [loading]);
  return (
    <div className="jPage">
      {surahs.map((surah, i) => (
        <SurahButton
          onClick={() => {
            navigate("/surah", { state: { surah: surah, number: number[i] } });
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
  ); // this will map out all of the surahs in that juz based on the use state containing those surahs
};

export default JuzPage;
