import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface City {
  name: string;
  coordinates: [number, number]; // [lng, lat]
}

interface MapViewProps {
  selectedCity: City | null;
}

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || '';
const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY || '';

const MapView: React.FC<MapViewProps> = ({ selectedCity }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const [weatherHTML, setWeatherHTML] = useState<string>('');

  const fetchWeather = async (lat: number, lng: number, name: string) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&appid=${weatherApiKey}`
      );
      const data = await res.json();

      if (data.cod !== '200' || !data.list || data.list.length < 9) {
        throw new Error(data.message || 'Invalid weather data');
      }

      const today = data.list[0];
      const tomorrow = data.list[8];

      const format = (forecast: any) => {
        const icon = forecast.weather[0].icon;
        const desc = forecast.weather[0].description;
        const temp = Math.round(forecast.main.temp);
        return `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="${desc}" /> ${desc}, ${temp}°C`;
      };

      setWeatherHTML(`
        <div style="
          font-family: sans-serif;
          padding: 8px;
          border-radius: 8px;
          background: white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          max-width: 220px;
          animation: fadeIn 0.3s ease;
        ">
          <h3 style="margin: 0 0 8px; font-size: 16px;">📍 ${name}</h3>
          <div style="font-size: 14px; line-height: 1.5;">
            <strong>Today:</strong> ${format(today)}<br/>
            <strong>Tomorrow:</strong> ${format(tomorrow)}
          </div>
        </div>
      `);
    } catch (err) {
      console.error('Failed to fetch weather data:', err);
      setWeatherHTML(`
        <div style="padding: 8px; background: white; border-radius: 8px; font-family: sans-serif;">
          <strong>Weather unavailable</strong>
        </div>
      `);
    }
  };

  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [0, 0],
        zoom: 2,
      });
    }
  }, []);

  useEffect(() => {
    if (selectedCity && mapRef.current) {
      const { coordinates, name } = selectedCity;
      const [lng, lat] = coordinates;

      mapRef.current.flyTo({
        center: coordinates,
        zoom: 8,
        essential: true,
      });

      // Remove old marker
      if (markerRef.current) {
        markerRef.current.remove();
      }

      fetchWeather(lat, lng, name).then(() => {
        // After weather is fetched, show marker with popup
        const popup = new mapboxgl.Popup({ offset: 25, className: 'animated-popup' }).setHTML(weatherHTML);

        const marker = new mapboxgl.Marker()
          .setLngLat(coordinates)
          .setPopup(popup)
          .addTo(mapRef.current!);

         
        markerRef.current = marker;
      });
    }
  }, [selectedCity, weatherHTML]);

  return (
    <div className="w-full h-full md:h-screen">
      <div ref={mapContainerRef} className="w-full h-[calc(100vh-60px)] md:h-full" />
    </div>
  );
};

export default MapView;