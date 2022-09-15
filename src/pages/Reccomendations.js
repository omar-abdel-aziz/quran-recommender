import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./rec.css";

const Reccomendations = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  return (
    <div className="recP">
      <div className="lSide">
        <div className="weekly">
          What to recite weekly:
          <br />
          <button
            onClick={() => {
              navigate("/surah", { state: { surah: "Al-Kahf", number: 18 } });
            }}
            className="kB"
          >
            Al-Kahf
          </button>
          <button
            onClick={() => {
              navigate("/surah", { state: { surah: "Al-Baqarah", number: 2 } });
            }}
            className="bB"
          >
            Al-Baqarah
          </button>
        </div>
        <div className="aSearch">
          <br />
          Search by Ayah in the Quran (1-6236)
          <br />
          <br />
          <input
            type="text"
            id="message"
            name="message"
            onChange={handleChange}
            value={message}
          />
          <button
            className="searchRec"
            onClick={() => {
              navigate("/AyahPage", {
                state: { ayahNum: message, desc: `Ayah number ${message}` },
              });
            }}
          >
            Search
          </button>
        </div>
      </div>

      <div className="daily">
        <span>Daily</span>
        <br />
        <button
          onClick={() => {
            navigate("/surah", { state: { surah: "Al-Fatihah", number: 1 } });
          }}
          className="fS"
        >
          Al-Fatihah
        </button>
        <br />
        <button
          className="kA"
          onClick={() => {
            navigate("/AyahPage", {
              state: { ayahNum: 262, desc: "Ayatul Kursi" },
            });
          }}
        >
          AyatulKursi
        </button>

        <br />
        <button
          onClick={() => {
            navigate("/surah", { state: { surah: "Al-Ikhlas", number: 112 } });
          }}
          className="iS"
        >
          Al Ikhlas
        </button>
        <br />
        <button
          onClick={() => {
            navigate("/surah", { state: { surah: "Al-Falaq", number: 113 } });
          }}
          className="fS"
        >
          Al Falaq
        </button>
        <br />
        <button
          onClick={() => {
            navigate("/surah", { state: { surah: "Al-Naas", number: 114 } });
          }}
          className="nS"
        >
          Al Naas
        </button>
        <br />
        <button
          onClick={() => {
            navigate("/surah", { state: { surah: "Al-Mulk", number: 67 } });
          }}
          className="mS"
        >
          Al Mulk
        </button>
        <br />
        <button
          onClick={() => {
            navigate("/surah", { state: { surah: "Al-Kafirun", number: 109 } });
          }}
          className="kS"
        >
          Al Kafirun
        </button>
        <br />
        <button
          onClick={() => {
            navigate("/surah", { state: { surah: "Al-Waqi’ah", number: 56 } });
          }}
          className="wS"
        >
          Al-Waqi’ah
        </button>
      </div>
    </div>
  );
};

export default Reccomendations;
