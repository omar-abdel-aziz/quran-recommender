import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./AyahPage.css";
import Quraa from "../componenets/Quraa";
import Autocomplete from "react-autocomplete";
const AyahPage = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [ayah, setAyah] = useState();
  const num = location.state.ayahNum;
  const desc = location.state.desc;
  const [sheikh, setSheikh] = useState();
  const [arabic, setArabic] = useState();
  const [edition, setEdition] = useState([]);
  const [value, setValue] = useState();
  const Ayah = () => {
    axios({
      method: "GET",
      url: `https://api.alquran.cloud/v1/ayah/${num}`,
    })
      .then((response) => {
        setAyah(response.data.data.text);
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
    Ayah();
    getAudio();
    loading ? setLoading(false) : console.log("lol");
  }, [arabic]);
  return (
    <div className="aPage">
      <div className="aTitle">{desc}</div>
      <div className="aContent">{ayah}</div>
      <div className="audAS">
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
        <audio
          controls
          src={
            sheikh === undefined
              ? undefined
              : `https://cdn.islamic.network/quran/audio/${Quraa[sheikh]}/${sheikh}/${num}.mp3`
          }
          className="aud"
        />
      </div>
    </div>
  );
};

export default AyahPage;
