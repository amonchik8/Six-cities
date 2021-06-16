import { useEffect, useState } from 'react';
import leaflet from 'leaflet';

function useMap(mapRef, hotels) {
  const [map, setMap] = useState(null);
  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: 52.370216,
          lng: 4.895168,
        },
        zoom: 10,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap(instance);
      const icon = leaflet.icon({
        iconUrl: 'img/pin.svg',
        iconSize: [30, 30],
        iconAnchor: [15, 30],
      });

      const offerCords = hotels.map((item) => [
        `${item.location.latitude}`,
        `${item.location.longitude}`,
      ]);

      for (let i = 0; i < offerCords.length; i++) {
        leaflet.marker(offerCords[i], { icon }).addTo(instance);
      }
    }
  }, [mapRef, map, hotels]);

  return map;
}

export default useMap;