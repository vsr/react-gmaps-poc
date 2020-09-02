import React from "react";
import useScript from "./useScript";
import { useCallback } from "react";
import "./map-reporter.css";
import { useState } from "react";
import debounce from "lodash.debounce";
import SearchBox from "./SearchBox";
import LocationModal from "./LocationModal";
import { useEffect } from "react";

export default () => {
  console.log("mapreporter");
  const map_api_url = `https://maps.googleapis.com/maps/api/js?key=${window.GOOGLE_MAP_API_KEY}`;
  const [loaded, error] = useScript(map_api_url);
  const mapLibLoaded = loaded && !error;
  const [map, setMap] = useState(null);
  const [geocoder, setGeocoder] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const mapRef = useCallback(
    (node) => {
      if (node && !map) {
        var uluru = { lat: -25.344, lng: 131.036 };
        console.log("initializing map");
        const gmap = new window.google.maps.Map(node, {
          zoom: 14,
          center: uluru,
        });
        setMap(gmap);
        setGeocoder(new window.google.maps.Geocoder());
      }
    },
    [map]
  );

  useEffect(() => {
    if (map) {
      map.addListener(
        "bounds_changed",
        debounce(() => {
          const bounds = map.getBounds();
          console.log("showModal", showModal);
          setShowModal(!showModal);
          console.log(bounds.toJSON());
        }, 1000)
      );
    }
  }, [map, showModal]);

  // setShowModal(!showModal);
  // useEffect(() => {
  //   setShowModal(!showModal);
  // }, [showModal]);

  const onSearch = (address) => {
    geocoder.geocode(
      {
        address,
      },
      function (results, status) {
        if (status === "OK") {
          map.setCenter(results[0].geometry.location);
          map.setZoom(11);
        } else {
          console.error(
            "Geocode was not successful for the following reason: " + status
          );
        }
      }
    );
  };

  return (
    <div>
      <h1>Google Maps using hooks; {showModal}</h1>
      {!loaded && !error && <p>Loading</p>}
      {loaded && error && <p>Error Loading</p>}
      {loaded && !error && <p>Loaded successfully</p>}
      {mapLibLoaded && (
        <div className="map-reporter">
          <SearchBox onSearch={onSearch} />
          <div className="map-container">
            <LocationModal show={showModal} location={selectedLocation} />
            <div className="map-el" ref={mapRef}></div>
          </div>
        </div>
      )}
    </div>
  );
};
