"use client";

import React, { useEffect, useRef } from "react";

const MapboxPropertyDetails = ({ geography, round }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const lng = geography?.lng;
  const lat = geography?.lat;

  useEffect(() => {
    if (lng == null || lat == null) return;

    let cancelled = false;

    Promise.all([
      import("mapbox-gl"),
      import("mapbox-gl/dist/mapbox-gl.css"),
    ]).then(([mapboxModule]) => {
      const mapboxgl = mapboxModule.default;
      if (cancelled || !mapContainerRef.current) return;

      mapboxgl.accessToken = process.env.ReactMapBoxToken;

      const homeMarkerEl = document.createElement("div");
      homeMarkerEl.innerHTML = `
    <div class="marker-container">
      <div class="top-image">
        <img src="/H&S-Logo-Contact-map.jpg" alt="Top Image" />
      </div>
      <div class="pin-icon">
        <svg version="1.1" id="fi_447031" class="pin-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
          <g>
            <g>
              <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                  c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                  c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z">
              </path>
            </g>
          </g>
        </svg>
      </div>
    </div>
  `;

      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: 12,
      });
      if (round) {
        new mapboxgl.Marker({ color: "black" })
          .setLngLat([lng, lat])
          .addTo(mapRef.current);
      } else {
        new mapboxgl.Marker({
          color: "black",
          element: homeMarkerEl,
        })
          .setLngLat([lng, lat])
          .addTo(mapRef.current);
      }
    });

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [lng, lat, round]);

  return (
    <div
      className={`h-full w-full ${round ? " rounded-lg" : ""}`}
      ref={mapContainerRef}
      style={{ height: "100%", width: "100%" }}
    />
  );
};

export default MapboxPropertyDetails;
