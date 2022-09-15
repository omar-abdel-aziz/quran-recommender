import React from "react";
import "./SurahButton.css";
const SurahButton = (props) => {
  const surah = props.surah;
  const type = props.type;
  const eName = props.eName;
  const translation = props.translation;
  const ayahs = props.ayahs;
  const number = props.number;
  return (
    <div onClick={props.onClick} className="surahButton">
      <div className="Scontent">
        <div>{surah}</div>
      </div>
      <div className="sInfo">
        <div>{eName}</div>
        <div>"{translation}"</div>
        <div>surah number: {number}</div>
        <div>{type === undefined ? " " : "type: " + type}</div>
        <div>number of ayahs: {ayahs}</div>
      </div>
    </div>
  );
};

export default SurahButton;
