import React from "react";
import "./location-modal.css";

const LocationModal = ({ location, show }) => {
  console.log("show", show);
  return (
    <div className={`location-modal-container ${show ? "open" : ""}`}>
      <p>
        {JSON.stringify(location)}: {show}
      </p>
    </div>
  );
};

export default LocationModal;
