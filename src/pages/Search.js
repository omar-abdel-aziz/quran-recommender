import React from "react";
import { useState } from "react";
import Autocomplete from "react-autocomplete";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Search.css";
const Search = () => {
  const [loading, setLoading] = useState(true); // values are not being passed to surahPage in teh /surah navigation
  const [value, setValue] = useState(); // also the language buttons are not working
  const [arabic, setArabic] = useState();
  const [indexing, setIndexing] = useState([]);
  const navigate = useNavigate();
  const getSearch = () => {
    axios({
      method: "GET",
      url: `http://api.alquran.cloud/v1/surah`,
    })
      .then((response) => {
        if (arabic) {
          setIndexing(
            response.data.data.map((surah, i) => ({
              label: surah.name,
              index: i,
            }))
          );
        } else {
          setIndexing(
            response.data.data.map((surah, i) => ({
              label: surah.englishName,
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
    getSearch();
  }, [loading, arabic]);
  return (
    <div className="SearchBody">
      <div className="arabicButton">
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
        items={indexing}
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
        onClick={() => {
          if (value.length > 0) {
            navigate("/surah", {
              state: {
                surah: value,
                number:
                  indexing.find((surah) => surah.label === value).index + 1,
              },
            });
          }
        }}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
