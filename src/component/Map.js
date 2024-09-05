import { forwardRef, useEffect, useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import maplibregl from "maplibre-gl";
import maplibreglWorker from "maplibre-gl/dist/maplibre-gl-csp-worker";
import "maplibre-gl/dist/maplibre-gl.css";

maplibregl.workerClass = maplibreglWorker;

const Map = forwardRef(({ lng, lat, zoom, ...props }, ref) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (!ref.current) {
      initMap();
    }
  }, []);

  const initMap = () => {
    ref.current = new maplibregl.Map({
      container: mapContainer.current, // container id
      style: "https://api.maptiler.com/maps/c12b458c-9e18-4b86-941f-77310c674f66/style.json?key=wZclUAXOyI4a4xo1yK6k", // style URL
      center: [120.894092, 23.6353498],
      zoom: 8,
      // pitch: 45,
      // bearing: -35,
    });
    let customLayers = [];
    ref.current.on("style.load", () => {
      customLayers.forEach((customLayer) => {
        ref.current.addLayer(customLayer);
      });
      ref.current.flyTo({
        center: [lng, lat],
        zoom: zoom,
        speed: 0.5,
        curve: 1, // change the speed at which it zooms out
        // This can be any easing function: it takes a number between
        // 0 and 1 and returns another number between 0 and 1.
        easing(t) {
          return t;
        },
        // this animation is considered essential with respect to prefers-reduced-motion
        essential: true,
      });
    });
  };

  return <Box width="100%" height="100%" ref={mapContainer}></Box>;
});
export default Map;
