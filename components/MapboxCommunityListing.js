"use client";

import React, { useEffect, useRef, useState } from "react";

const MapboxCommunityListing = ({ listings }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const mapboxglRef = useRef(null);
  const markersRef = useRef([]);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      import("mapbox-gl"),
      import("mapbox-gl/dist/mapbox-gl.css"),
    ]).then(([mapboxModule]) => {
      const mapboxgl = mapboxModule.default;
      if (cancelled || !mapContainerRef.current) return;

      mapboxglRef.current = mapboxgl;
      mapboxgl.accessToken = process.env.ReactMapBoxToken;

      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [55.296249, 25.176988],
        zoom: 10,
      });

      setMapReady(true);
    });

    return () => {
      cancelled = true;
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      mapRef.current?.remove();
      mapRef.current = null;
      mapboxglRef.current = null;
      setMapReady(false);
    };
  }, []);

  useEffect(() => {
    const mapboxgl = mapboxglRef.current;
    if (!mapReady || !mapRef.current || !listings || !mapboxgl) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    listings.forEach((community) => {
      const {
        slug,
        coverPhoto,
        location,
        title,
        brand,
        communityType,
      } = community;

      const geography = community.geography;

      if (!geography || !geography.lat || !geography.lng) {
        console.warn(`No geography data for ${title}`);
        return;
      }

      const { lng, lat } = geography;

      const markerEl = document.createElement("div");
      markerEl.className = "custom-community-marker";
      markerEl.innerHTML = `<div class="community-marker-tag">${brand || "Community"}</div>`;

      const marker = new mapboxgl.Marker({
        element: markerEl,
        anchor: "bottom",
      })
        .setLngLat([lng, lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <a href="/communities/${slug}" class="block max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden font-custom2 hover:shadow-xl transition-shadow">
              <!-- Image Section -->
              <img src="${coverPhoto?.url}" alt="${title}" class="w-full h-48 object-cover">

              <!-- Content Section -->
              <div class="p-4 space-y-2">
                <!-- Title -->
                <div class="text-lg font-bold text-gray-900">${title}</div>

                <!-- Brand -->
                ${brand ? `<div class="text-sm font-medium text-gray-600">By ${brand}</div>` : ""}

                <!-- Community Type -->
                ${communityType ? `<div class="text-sm text-gray-500">${communityType}</div>` : ""}

                <!-- Location -->
                <div class="flex items-center text-sm text-gray-400 gap-2 pt-2 border-t">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 368.16 368.16">
                    <path d="M184.08,0c-74.992,0-136,61.008-136,136c0,24.688,11.072,51.24,11.536,52.36c3.576,8.488,10.632,21.672,15.72,29.4
                      l93.248,141.288c3.816,5.792,9.464,9.112,15.496,9.112s11.68-3.32,15.496-9.104l93.256-141.296
                      c5.096-7.728,12.144-20.912,15.72-29.4c0.464-1.112,11.528-27.664,11.528-52.36C320.08,61.008,259.072,0,184.08,0z
                      M293.8,182.152c-3.192,7.608-9.76,19.872-14.328,26.8l-93.256,141.296c-1.84,2.792-2.424,2.792-4.264,0L88.696,208.952
                      c-4.568-6.928-11.136-19.2-14.328-26.808C74.232,181.816,64.08,157.376,64.08,136c0-66.168,53.832-120,120-120
                      c66.168,0,120,53.832,120,120C304.08,157.408,293.904,181.912,293.8,182.152z"/>
                    <path d="M184.08,64.008c-39.704,0-72,32.304-72,72c0,39.696,32.296,72,72,72c39.704,0,72-32.304,72-72
                      C256.08,96.312,223.784,64.008,184.08,64.008z M184.08,192.008c-30.872,0-56-25.12-56-56s25.128-56,56-56s56,25.12,56,56
                      S214.952,192.008,184.08,192.008z"/>
                  </svg>
                  <span>${location?.slice(0, 3)?.map((item) => item.name).reverse().join(" , ")}</span>
                </div>

                <!-- View Details Button -->
                <div class="pt-3">
                  <span class="inline-block text-sm font-semibold text-blue-600 hover:text-blue-800">
                    View Details →
                  </span>
                </div>
              </div>
            </a>
          `)
        )
        .addTo(mapRef.current);

      markersRef.current.push(marker);
    });
  }, [listings, mapReady]);

  return (
    <>
      <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />

      <style jsx global>{`
        .custom-community-marker {
          cursor: pointer;
        }

        .community-marker-tag {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          white-space: nowrap;
          border: 2px solid white;
          transition: all 0.3s ease;
        }

        .community-marker-tag:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        }

        .mapboxgl-popup-content {
          padding: 0 !important;
          border-radius: 8px;
        }

        .mapboxgl-popup-close-button {
          font-size: 20px;
          padding: 4px 8px;
          color: #666;
        }

        .mapboxgl-popup-close-button:hover {
          background-color: rgba(0, 0, 0, 0.05);
          color: #000;
        }
      `}</style>
    </>
  );
};

export default MapboxCommunityListing;
