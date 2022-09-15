import React from "react";
import Modal from "../Modal/Modal";
//have array of 604, the do map and set the array state with that specific page to get the values
// set a state to be array holding value of ayahs for each page of the quran.
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./surahPage.css";
import Autocomplete from "react-autocomplete";
import Quraa from "./Quraa";
const SurahPage = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const surah = location.state.number;
  const surahName = location.state.surah;
  const [fullS, setFullS] = useState([]);
  const [value, setValue] = useState();
  const [edition, setEdition] = useState([]);
  const [arabic, setArabic] = useState();
  const [sheikh, setSheikh] = useState();
  const [num, setNum] = useState([]);
  const [surahnum, setSurahnum] = useState();
  const navigate = useNavigate();
  const getSurah = () => {
    axios({
      method: "GET",
      url: `http://api.alquran.cloud/v1/surah/${surah}`,
    })
      .then((response) => {
        setSurahnum(response.data.data.number);
        setNum(response.data.data.ayahs.map((a) => a.number));
        setFullS(response.data.data.ayahs.map((a) => a.text));
        console.log("INFORMATION");
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getAudio = () => {
    axios({
      method: "GET",
      url: `http://api.alquran.cloud/v1/edition?format=audio&language=ar&type=versebyverse`,
    })
      .then((response) => {
        console.log("edition");
        console.log(response.data.data);
        if (arabic) {
          setEdition(
            response.data.data.map((name, i) => ({
              edition: name.identifier,
              label: name.name,
              index: i,
            }))
          );
        } else {
          setEdition(
            response.data.data.map((name, i) => ({
              edition: name.identifier,
              label: name.englishName,
              index: i,
            }))
          );
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAudio();
    getSurah();
    loading ? setLoading(false) : console.log("lol");
  }, [loading, arabic]);
  return (
    <div className="ayah">
      <div className="sPick">
        <div className="arButton">
          {/** */}
          <button
            onClick={() => {
              setArabic(true);
            }}
          >
            Arabic
          </button>
          <div style={{ width: "1vw" }}> </div>
          <button
            onClick={() => {
              setArabic(false);
            }}
          >
            English
          </button>
        </div>
        <Autocomplete
          menuStyle={{ zIndex: 0.5 }}
          className="AutocompleteSurah"
          getItemValue={(item) => item.label}
          items={edition}
          renderItem={(item, isHighlighted) => (
            <div
              style={{
                background: isHighlighted ? "lightgray" : "white",
                zIndex: 1,
              }}
            >
              {item.label}
            </div>
          )}
          value={value}
          onChange={(e) => setValue(e.target.value)} // make all of these picking things in a drop down menu.
          onSelect={(val) => {
            setValue(val);
            console.log(val);
          }}
        />
        <button
          className="shButton"
          onClick={() => {
            setSheikh(edition.find((surah) => surah.label === value).edition);
            console.log("sheikh");
            console.log(sheikh);
          }}
        >
          Set Sheikh
        </button>
      </div>
      <div className="title">{surahName}</div> {/* HERE */}
      <audio
        controls
        src={
          sheikh === undefined
            ? undefined
            : `https://cdn.islamic.network/quran/audio-surah/128/${sheikh}/${surah}.mp3`
        }
        className="surahAud"
      >
        Play entire Surah
      </audio>
      {fullS.map((a, i) => (
        <div className="inner" key={i}>
          <audio
            controls
            src={
              sheikh === undefined
                ? undefined
                : `https://cdn.islamic.network/quran/audio/${Quraa[sheikh]}/${sheikh}/${num[i]}.mp3`
            }
            className="aud"
          />
          <div key={i}>
            {a}
            {i + 1}۝
            <br />
            <button
              className="pbutton"
              onClick={() => {
                navigate("/AyahPage", {
                  state: {
                    ayahNum: num[i],
                    desc: `${surahName}     Ayah ${i + 1}`,
                  },
                });
              }}
            >
              page
            </button>
            <Modal number={i + 1} snum={surahnum} Style={{ zIndex: 1 }} />
          </div>
        </div>
      ))}
      {() => {
        // setTranslation(false);
      }}
      <div className="ending">صَدَقَ اللّٰهُ الْعَظِيْم</div>
    </div>
  );
};

export default SurahPage;
