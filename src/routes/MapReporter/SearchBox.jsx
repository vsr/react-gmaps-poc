import React from "react";
import { useRef } from "react";

const SearchBox = ({ onSearch }) => {
  const mapLocatorInput = useRef(null);
  const onSubmit = (ev) => {
    ev.preventDefault();
    onSearch(mapLocatorInput.current.value);
  };
  return (
    <form className="map-locator" onSubmit={onSubmit}>
      <input type="text" ref={mapLocatorInput}></input>
      <input type="submit" value="Search"></input>
    </form>
  );
};

export default SearchBox;
