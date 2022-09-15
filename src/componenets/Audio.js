import React from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Autocomplete from "react-autocomplete";
const Audio = () => {
  const [value, setValue] = useState();
  const [edition, setEdition] = useState([]);
  const [person, setPerson] = useState();
  const [loading, setLoading] = useState(true);
  const [arabic, setArabic] = useState();
  const getAudio = () => {
    axios({
      method: "GET",
      url: `http://api.alquran.cloud/v1/edition?format=audio&language=ar&type=versebyverse`,
    })
      .then((response) => {
        //setEdition(response.data.data);
        console.log("edition");
        console.log(response.data.data);
        if (arabic) {
          setEdition(
            response.data.data.map((name, i) => ({
              label: name.name,
              index: i,
            }))
          );
        } else {
          setEdition(
            response.data.data.map((name, i) => ({
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
    loading ? setLoading(false) : console.log("lol");
  }, [loading, arabic]);
  return (
    <div>
      <div>
        <button
          onClick={() => {
            setArabic(true);
          }}
        >
          Arabic
        </button>
        <button
          onClick={() => {
            setArabic(false);
          }}
        >
          English
        </button>
      </div>
      <Autocomplete
        className="Autocomplete"
        getItemValue={(item) => item.label}
        items={edition}
        renderItem={(item, isHighlighted) => (
          <div style={{ background: isHighlighted ? "lightgray" : "white" }}>
            {item.label}
          </div>
        )}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onSelect={(val) => {
          setValue(val);
          console.log(val);
        }}
      />
      <button
      // onClick={() => {
      //   edition.find((surah) => surah.label === value).index + 1;
      // }}
      >
        Play Audio
      </button>
    </div>
  );
};

export default Audio;
