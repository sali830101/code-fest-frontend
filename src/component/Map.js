import { forwardRef, useEffect, useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import maplibregl from "maplibre-gl";
import maplibreglWorker from "maplibre-gl/dist/maplibre-gl-csp-worker";
import "maplibre-gl/dist/maplibre-gl.css";

maplibregl.workerClass = maplibreglWorker;

const Map = forwardRef(({ lng, lat, zoom, ...props }, ref) => {
  const mapContainer = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const userMarker = useRef(null);

  useEffect(() => {
    if (!ref.current) {
      initMap();
    }
  }, []);

  useEffect(() => {
    if (ref.current && userLocation) {
      if (userMarker.current) {
        userMarker.current.setLngLat([userLocation.longitude, userLocation.latitude]);
      } else {
        userMarker.current = new maplibregl.Marker()
          .setLngLat([userLocation.longitude, userLocation.latitude])
          .addTo(ref.current);
      }

      ref.current.flyTo({
        center: [userLocation.longitude, userLocation.latitude],
        zoom: 14,
        speed: 0.5,
        curve: 1,
        easing(t) {
          return t;
        },
        essential: true,
      });
    }
  }, [userLocation]);

  const initMap = () => {
    ref.current = new maplibregl.Map({
<<<<<<< HEAD
      container: mapContainer.current,
      style: "style.json",
=======
      container: mapContainer.current, // container id
      style: "https://api.maptiler.com/maps/c12b458c-9e18-4b86-941f-77310c674f66/style.json?key=wZclUAXOyI4a4xo1yK6k", // style URL
>>>>>>> origin/main
      center: [120.894092, 23.6353498],
      zoom: 8,
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
        curve: 1,
        easing(t) {
          return t;
        },
        essential: true,
      });
    });

    const gpsButton = document.createElement('button');
    gpsButton.textContent = 'Get My Location';
    gpsButton.className = 'maplibregl-ctrl-gps';
    gpsButton.addEventListener('click', getUserLocation);

    const gpsControl = new maplibregl.NavigationControl({
      showCompass: false,
      showZoom: false,
      visualizePitch: false
    });
    gpsControl._container.appendChild(gpsButton);

    ref.current.addControl(gpsControl, 'bottom-right');
  };

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return <Box width="100%" height="100%" ref={mapContainer}></Box>;
});

export default Map;