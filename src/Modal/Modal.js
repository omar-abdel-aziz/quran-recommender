import React, { useState, useEffect } from "react";
import "./Modal.css";
import axios from "axios";

export default function Modal(props) {
  const [modal, setModal] = useState(false);
  const [translation, setTranslation] = useState("");
  const [loading, setLoading] = useState(true);
  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  const getTranslation = () => {
    axios({
      method: "GET",
      url: `http://api.alquran.cloud/v1/ayah/${props.snum}:${props.number}/en.asad`,
    })
      .then((response) => {
        setTranslation(response.data.data.text);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getTranslation();
    loading ? setLoading(false) : console.log("lol");
  }, [loading]);
  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Translation
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Translation</h2>
            <p>{translation}</p>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
