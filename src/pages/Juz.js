import React from "react";
import { useNavigate } from "react-router-dom";
import "./Juz.css";
const Juz = () => {
  let arr = new Array(30).fill(0);
  const navigate = useNavigate();
  return (
    <div className="JuzPage">
      {arr.map((a, i) => (
        <button
          onClick={() => {
            navigate("/JuzPage", { state: { number: i + 1 } });
          }}
        >
          Juz {i + 1}{" "}
        </button>
      ))}
    </div>
  );
};

export default Juz;
