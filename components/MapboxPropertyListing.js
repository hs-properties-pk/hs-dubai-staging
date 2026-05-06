"use client";

import React, { useEffect, useRef, useState } from "react";

const MapboxPropertyListing = ({ listings }) => {
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
        center: [55.296249, 25.276987],
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

    listings.forEach((listing) => {
      const {
        geography,
        price,
        rooms,
        baths,
        area,
        areaUnit,
        coverPhoto,
        location,
        purpose = "off-plan",
        slug,
        price_period,
      } = listing;
      if (!geography?.lng || !geography?.lat) return;
      const { lng, lat } = geography;

      const rentPeriodLabel = purpose === "for-rent"
        ? ` / ${{ yearly: "Year", quarterly: "Quarter", monthly: "Month", weekly: "Week", daily: "Day" }[(price_period || "yearly").toLowerCase()] || "Year"}`
        : "";

      const homeMarkerEl = document.createElement("div");
      homeMarkerEl.innerHTML = `<div class="price-tag">${`AED ${price
        ?.toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${rentPeriodLabel}`}</div>`;
      if (purpose === "for-sale" || purpose === "for-rent") {
        const marker = new mapboxgl.Marker({
          color: "black",
          element: homeMarkerEl,
        })
          .setLngLat([lng, lat])
          .setPopup(
            new mapboxgl.Popup().setHTML(`

                         <a href=${`/properties/${purpose}/${slug}`} class=" block max-w-5xl bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden font-custom2">
     
                         <!-- Image Section -->
     <img src="${
       coverPhoto?.url
     }" alt="Apartment Image" class="w-full h-48 object-cover">

     <!-- Content Section -->
     <div class="p-4 space-y-2">
         <!-- Price -->
          <div class="text-xl font-semibold text-gray-800">${
            listing?.location[listing?.location?.length - 1].name
          }</div>
         <div class="text-base font-semibold text-gray-800">${`AED ${price
           ?.toString()
           .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${rentPeriodLabel}`}</div>


         <!-- Location -->
         <div class="flex items-center text-sm text-gray-400 gap-2">
            <svg version="1.1" id="fi_927667" xmlns="http:www.w3.org/2000/svg"  class="h-3.5 w-3.5" xmlns:xlink="http:www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 368.16 368.16" style="enable-background:new 0 0 368.16 368.16;" xml:space="preserve">
 <g>
 	<g>
 		<g>
 			<path d="M184.08,0c-74.992,0-136,61.008-136,136c0,24.688,11.072,51.24,11.536,52.36c3.576,8.488,10.632,21.672,15.72,29.4
 				l93.248,141.288c3.816,5.792,9.464,9.112,15.496,9.112s11.68-3.32,15.496-9.104l93.256-141.296
 				c5.096-7.728,12.144-20.912,15.72-29.4c0.464-1.112,11.528-27.664,11.528-52.36C320.08,61.008,259.072,0,184.08,0z
 				 M293.8,182.152c-3.192,7.608-9.76,19.872-14.328,26.8l-93.256,141.296c-1.84,2.792-2.424,2.792-4.264,0L88.696,208.952
 				c-4.568-6.928-11.136-19.2-14.328-26.808C74.232,181.816,64.08,157.376,64.08,136c0-66.168,53.832-120,120-120
 				c66.168,0,120,53.832,120,120C304.08,157.408,293.904,181.912,293.8,182.152z"></path>
 			<path d="M184.08,64.008c-39.704,0-72,32.304-72,72c0,39.696,32.296,72,72,72c39.704,0,72-32.304,72-72
 				C256.08,96.312,223.784,64.008,184.08,64.008z M184.08,192.008c-30.872,0-56-25.12-56-56s25.128-56,56-56s56,25.12,56,56
 				S214.952,192.008,184.08,192.008z"></path></g></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
             <span>${location
               ?.slice(0, 3)
               ?.map((item) => item.name)
               .reverse()
               .join(" , ")}</span>
         </div>

         <!-- Features -->
         <div class="grid grid-cols-3 w-full mt-2 text-sm text-gray-400">
             <div class="flex items-center gap-2">
                 <svg id="fi_2284001" class="h-4 w-4" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http:www.w3.org/2000/svg"><g><path d="m479.336 251.492v-160.926c0-39.144-31.846-70.989-70.989-70.989h-306.735c-39.144 0-70.989 31.846-70.989 70.989v163.002c-18.96 19.822-30.623 46.679-30.623 76.209v122.023c0 22.399 18.223 40.623 40.623 40.623 22.399 0 40.622-18.224 40.622-40.623v-12.602h349.511v12.602c0 22.399 18.223 40.623 40.622 40.623s40.622-18.223 40.622-40.623v-122.023c0-30.575-12.504-58.283-32.664-78.285zm-377.724-211.915h306.735c28.116 0 50.989 22.874 50.989 50.989v145.187c-6.125-3.771-12.643-6.961-19.479-9.491v-33.254c0-29.48-23.984-53.464-53.464-53.464h-86.928c-17.896 0-33.755 8.847-43.464 22.388-9.709-13.541-25.568-22.388-43.464-22.388h-86.928c-29.48 0-53.464 23.983-53.464 53.464v33.254c-7.601 2.813-14.81 6.441-21.521 10.777v-146.473c-.001-28.115 22.872-50.989 50.988-50.989zm8.721 179.867c-6.195 0-12.271.522-18.19 1.508v-27.944c0-18.452 15.012-33.464 33.464-33.464h86.928c18.452 0 33.464 15.012 33.464 33.464v26.437h-135.666zm155.667-26.437c0-18.452 15.012-33.464 33.464-33.464h86.928c18.452 0 33.464 15.012 33.464 33.464v27.944c-5.92-.986-11.995-1.508-18.19-1.508h-135.666zm-155.667 46.437h291.333c49.81 0 90.333 40.523 90.333 90.333v29.667h-100.296c-5.523 0-10 4.478-10 10s4.477 10 10 10h100.297v39.755h-472v-39.755h271.703c5.523 0 10-4.478 10-10s-4.477-10-10-10h-271.703v-29.667c0-49.81 40.523-90.333 90.333-90.333zm-49.088 212.356c0 11.371-9.251 20.623-20.622 20.623s-20.623-9.252-20.623-20.623v-12.602h41.245zm410.132 20.623c-11.371 0-20.622-9.252-20.622-20.623v-12.602h41.245v12.602c0 11.371-9.251 20.623-20.623 20.623z"></path><circle cx="341.698" cy="369.444" r="10.005"></circle></g></svg>
                 <span>${rooms === 0 ? "Studio" : `${rooms}`}</span>
             </div>
             <div class="flex items-center gap-2">
                 <svg version="1.1" id="fi_333447" class="h-4 w-4" xmlns="http:www.w3.org/2000/svg" xmlns:xlink="http:www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
 <g>
 	<g>
 		<path d="M480,234.679H53.333V54.839c0-12.16,11.307-22.827,24.213-22.827h44.587c12.587,0,22.72,10.24,22.827,22.72
 			c-20.8,5.227-38.293,24.427-38.293,44.693v28.587c0,5.867,4.8,10.667,10.667,10.667H192c5.867,0,10.667-4.8,10.667-10.667V99.426
 			c0-20.587-16.32-39.467-36.373-44.587c0-24.32-19.733-44.16-44.16-44.16H77.547C52.907,10.679,32,30.946,32,54.839v179.84
 			c-17.6-0.107-31.893,14.187-32,31.787c0,9.173,3.84,17.813,10.667,23.893v55.893c0,43.413,19.307,80.64,50.56,104.853
 			l-17.493,34.773c-2.667,5.227-0.533,11.627,4.8,14.293c5.227,2.667,11.627,0.533,14.293-4.8l16.427-32.747
 			c21.547,11.52,45.653,17.493,70.08,17.28h213.333c24.427,0.213,48.533-5.76,70.08-17.28l16.427,32.747
 			c2.667,5.227,9.067,7.36,14.293,4.8c5.227-2.56,7.36-9.067,4.8-14.293l-17.493-34.88c31.253-24.107,50.56-61.44,50.56-104.853
 			v-55.893c6.72-5.867,10.667-14.507,10.667-23.573C512,248.973,497.707,234.679,480,234.679z M155.627,74.679
 			c12.693,0,25.707,12.48,25.707,24.747v17.92H128v-17.92C128,87.586,142.4,74.679,155.627,74.679z M480,346.253
 			c0,64.107-50.453,112.427-117.333,112.427H149.333C82.453,458.679,32,410.359,32,346.253v-47.573h448V346.253z M480,277.346H32.32
 			c-5.333,0-10.133-3.84-10.88-9.067c-0.96-6.613,4.16-12.267,10.56-12.267h447.68c5.333,0,10.133,3.84,10.88,9.067
 			C491.52,271.693,486.4,277.346,480,277.346z"></path></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                 <span>${baths}</span>
             </div>
             <div class="flex items-center gap-2">
                <svg id="fi_9847426" height="512" class="h-4 w-4" viewBox="0 0 512 512" width="512" xmlns="http:www.w3.org/2000/svg" data-name="Layer 1"><path d="m5.009 5.008a16.991 16.991 0 0 0 -5.009 12.092v79.945a12.525 12.525 0 1 0 25.049 0v-54.284l112.7 112.7a12.525 12.525 0 0 0 17.713-17.712l-112.7-112.7h54.284a12.525 12.525 0 0 0 0-25.049h-79.946a16.98 16.98 0 0 0 -12.091 5.008z"></path><path d="m506.992 506.991a16.991 16.991 0 0 1 -12.092 5.009h-79.945a12.525 12.525 0 1 1 0-25.049h54.284l-112.7-112.7a12.525 12.525 0 1 1 17.712-17.713l112.7 112.7v-54.284a12.525 12.525 0 0 1 25.049 0v79.946a16.98 16.98 0 0 1 -5.008 12.091z"></path><path d="m5.008 506.991a16.991 16.991 0 0 0 12.092 5.009h79.945a12.525 12.525 0 1 0 0-25.049h-54.284l112.7-112.7a12.525 12.525 0 1 0 -17.712-17.713l-112.7 112.7v-54.284a12.525 12.525 0 0 0 -25.049 0v79.946a16.98 16.98 0 0 0 5.008 12.091z"></path><path d="m506.991 5.008a16.991 16.991 0 0 1 5.009 12.092v79.945a12.525 12.525 0 1 1 -25.049 0v-54.284l-112.7 112.7a12.525 12.525 0 1 1 -17.713-17.712l112.7-112.7h-54.284a12.525 12.525 0 0 1 0-25.049h79.946a16.98 16.98 0 0 1 12.091 5.008z"></path></svg>
                 <span>${areaUnit === "sqft" ? Math.round(area) : Math.round(area * 10.76391041671)} Sq Ft</span>
             </div>
         </div>
     </div>
 </a>
          `)
          )
          .addTo(mapRef.current);
        markersRef.current.push(marker);
      } else {
        const marker = new mapboxgl.Marker({
          color: "black",
          element: homeMarkerEl,
        })
          .setLngLat([lng, lat])
          .setPopup(
            new mapboxgl.Popup().setHTML(`
  
                           <a href=${`/properties/${purpose}/${slug}`} class=" block max-w-5xl bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden font-custom2">
       
                           <!-- Image Section -->
       <img src="${
         coverPhoto?.url
       }" alt="Apartment Image" class="w-full h-48 object-cover">
  
       <!-- Content Section -->
       <div class="p-4 space-y-2">
           <!-- Price -->
            <div class="text-xl font-semibold text-gray-800">${
              listing.title
            }</div>
           <div class="text-base font-semibold text-gray-800">${`AED ${price
             ?.toString()
             .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
  
  
           <!-- Location -->
           <div class="flex items-center text-sm text-gray-400 gap-2">
              <svg version="1.1" id="fi_927667" xmlns="http:www.w3.org/2000/svg"  class="h-3.5 w-3.5" xmlns:xlink="http:www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 368.16 368.16" style="enable-background:new 0 0 368.16 368.16;" xml:space="preserve">
   <g>
     <g>
       <g>
         <path d="M184.08,0c-74.992,0-136,61.008-136,136c0,24.688,11.072,51.24,11.536,52.36c3.576,8.488,10.632,21.672,15.72,29.4
           l93.248,141.288c3.816,5.792,9.464,9.112,15.496,9.112s11.68-3.32,15.496-9.104l93.256-141.296
           c5.096-7.728,12.144-20.912,15.72-29.4c0.464-1.112,11.528-27.664,11.528-52.36C320.08,61.008,259.072,0,184.08,0z
            M293.8,182.152c-3.192,7.608-9.76,19.872-14.328,26.8l-93.256,141.296c-1.84,2.792-2.424,2.792-4.264,0L88.696,208.952
           c-4.568-6.928-11.136-19.2-14.328-26.808C74.232,181.816,64.08,157.376,64.08,136c0-66.168,53.832-120,120-120
           c66.168,0,120,53.832,120,120C304.08,157.408,293.904,181.912,293.8,182.152z"></path>
         <path d="M184.08,64.008c-39.704,0-72,32.304-72,72c0,39.696,32.296,72,72,72c39.704,0,72-32.304,72-72
           C256.08,96.312,223.784,64.008,184.08,64.008z M184.08,192.008c-30.872,0-56-25.12-56-56s25.128-56,56-56s56,25.12,56,56
           S214.952,192.008,184.08,192.008z"></path>
       </g></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
               <span>${location
                 ?.slice(0, 3)
                 ?.map((item) => item.name)
                 .reverse()
                 .join(" , ")}</span>
           </div>
  
           <!-- Features -->
           <div class="grid grid-cols-1 w-full gap-2 mt-2 text-sm text-gray-400">
               <div class="flex items-center gap-2">
                   <svg id="fi_2284001" class="h-4 w-4" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http:www.w3.org/2000/svg"><g><path d="m479.336 251.492v-160.926c0-39.144-31.846-70.989-70.989-70.989h-306.735c-39.144 0-70.989 31.846-70.989 70.989v163.002c-18.96 19.822-30.623 46.679-30.623 76.209v122.023c0 22.399 18.223 40.623 40.623 40.623 22.399 0 40.622-18.224 40.622-40.623v-12.602h349.511v12.602c0 22.399 18.223 40.623 40.622 40.623s40.622-18.223 40.622-40.623v-122.023c0-30.575-12.504-58.283-32.664-78.285zm-377.724-211.915h306.735c28.116 0 50.989 22.874 50.989 50.989v145.187c-6.125-3.771-12.643-6.961-19.479-9.491v-33.254c0-29.48-23.984-53.464-53.464-53.464h-86.928c-17.896 0-33.755 8.847-43.464 22.388-9.709-13.541-25.568-22.388-43.464-22.388h-86.928c-29.48 0-53.464 23.983-53.464 53.464v33.254c-7.601 2.813-14.81 6.441-21.521 10.777v-146.473c-.001-28.115 22.872-50.989 50.988-50.989zm8.721 179.867c-6.195 0-12.271.522-18.19 1.508v-27.944c0-18.452 15.012-33.464 33.464-33.464h86.928c18.452 0 33.464 15.012 33.464 33.464v26.437h-135.666zm155.667-26.437c0-18.452 15.012-33.464 33.464-33.464h86.928c18.452 0 33.464 15.012 33.464 33.464v27.944c-5.92-.986-11.995-1.508-18.19-1.508h-135.666zm-155.667 46.437h291.333c49.81 0 90.333 40.523 90.333 90.333v29.667h-100.296c-5.523 0-10 4.478-10 10s4.477 10 10 10h100.297v39.755h-472v-39.755h271.703c5.523 0 10-4.478 10-10s-4.477-10-10-10h-271.703v-29.667c0-49.81 40.523-90.333 90.333-90.333zm-49.088 212.356c0 11.371-9.251 20.623-20.622 20.623s-20.623-9.252-20.623-20.623v-12.602h41.245zm410.132 20.623c-11.371 0-20.622-9.252-20.622-20.623v-12.602h41.245v12.602c0 11.371-9.251 20.623-20.623 20.623z"></path><circle cx="341.698" cy="369.444" r="10.005"></circle></g></svg>
                   <span>${rooms} Bedrooms</span>
               </div>
               <div class="flex items-center gap-2">
                  <svg id="fi_9847426" height="512" class="h-4 w-4" viewBox="0 0 512 512" width="512" xmlns="http:www.w3.org/2000/svg" data-name="Layer 1"><path d="m5.009 5.008a16.991 16.991 0 0 0 -5.009 12.092v79.945a12.525 12.525 0 1 0 25.049 0v-54.284l112.7 112.7a12.525 12.525 0 0 0 17.713-17.712l-112.7-112.7h54.284a12.525 12.525 0 0 0 0-25.049h-79.946a16.98 16.98 0 0 0 -12.091 5.008z"></path><path d="m506.992 506.991a16.991 16.991 0 0 1 -12.092 5.009h-79.945a12.525 12.525 0 1 1 0-25.049h54.284l-112.7-112.7a12.525 12.525 0 1 1 17.712-17.713l112.7 112.7v-54.284a12.525 12.525 0 0 1 25.049 0v79.946a16.98 16.98 0 0 1 -5.008 12.091z"></path><path d="m5.008 506.991a16.991 16.991 0 0 0 12.092 5.009h79.945a12.525 12.525 0 1 0 0-25.049h-54.284l112.7-112.7a12.525 12.525 0 1 0 -17.712-17.713l-112.7 112.7v-54.284a12.525 12.525 0 0 0 -25.049 0v79.946a16.98 16.98 0 0 0 5.008 12.091z"></path><path d="m506.991 5.008a16.991 16.991 0 0 1 5.009 12.092v79.945a12.525 12.525 0 1 1 -25.049 0v-54.284l-112.7 112.7a12.525 12.525 0 1 1 -17.713-17.712l112.7-112.7h-54.284a12.525 12.525 0 0 1 0-25.049h79.946a16.98 16.98 0 0 1 12.091 5.008z"></path></svg>
                   <span>${area} Sq Ft</span>
               </div>
           </div>
       </div>
   </a>
            `)
          )
          .addTo(mapRef.current);
        markersRef.current.push(marker);
      }
    });
  }, [listings, mapReady]);

  return <div className="h-full" ref={mapContainerRef} />;
};

export default MapboxPropertyListing;
