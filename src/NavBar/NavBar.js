import React from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import Home from "../pages/Home";
const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        <div>home</div>
      </button>
      <button
        onClick={() => {
          navigate("/reccomendations");
        }}
      >
        <div>recs</div>
      </button>
      <button
        onClick={() => {
          navigate("/search");
        }}
      >
        <div>search</div>
      </button>
      <button
        onClick={() => {
          navigate("/Juz's");
        }}
      >
        <div>Juzs</div>
      </button>
    </div>
  );
};

export default NavBar;
