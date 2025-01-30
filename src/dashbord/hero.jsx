'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Heart, Activity, Volume2, AlertTriangle, Mic, Brain } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from '/map.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Custom Leaflet marker icon
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component for ECG graph simulation
function ECGGraph({ color = 'red', rate = 70 }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    let path = '';
    let x = 0;

    function drawLine() {
      const y = 50;
      path += `${x},${y} `;
      x += 1;

      if (x >= 400) {
        x = 0;
        path = '';
      }

      if (x % 40 === 0) {
        path += `${x},${y} ${x + 5},${y - 10} ${x + 10},${y} `;
        path += `${x + 15},${y} ${x + 17},${y + 30} ${x + 19},${y - 30} ${x + 21},${y + 10} ${x + 23},${y} `;
        path += `${x + 30},${y} ${x + 35},${y + 10} ${x + 40},${y} `;
        x += 40;
      }

      svg.innerHTML = `<path d="M ${path}" fill="none" stroke="${color}" stroke-width="2" />`;

      requestAnimationFrame(drawLine);
    }

    drawLine();

    return () => cancelAnimationFrame(drawLine);
  }, [color, rate]);

  return <svg ref={svgRef} viewBox="0 0 400 100" className="w-full h-16"></svg>;
}

// Health monitor box component
function MonitorBox({ title, value, icon, color, bgColor, showGraph, rate }) {
  return (
    <div className={`rounded-lg shadow-md p-6 ${bgColor}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className={color}>{icon}</div>
      </div>
      <p className="text-3xl font-bold mb-2">{value}</p>
      {showGraph && <ECGGraph color={color.replace('text-', '')} rate={rate} />}
    </div>
  );
}

// Map component with live location
function LiveLocationMap() {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (location) => {
          const newPos = {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          };
          setPosition(newPos);
          map.flyTo(newPos, 13);
        },
        (error) => {
          console.error('Error fetching location:', error);
        },
        { enableHighAccuracy: true }
      );
    }
  }, [map]);

  return position ? (
    <Marker position={position}>
      <Popup>Your live location</Popup>
    </Marker>
  ) : null;
}

// Main component
export default function Component() {
  const [stressLevel, setStressLevel] = useState(50);
  const [pulseRate, setPulseRate] = useState(75);
  const [detectedKeyword, setDetectedKeyword] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const keywords = ['help', 'danger'];

  useEffect(() => {
    const stressInterval = setInterval(() => {
      setStressLevel((prev) => Math.max(0, Math.min(100, prev + Math.floor(Math.random() * 21) - 10)));
    }, 3000);

    return () => clearInterval(stressInterval);
  }, []);

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join('');

        keywords.forEach((keyword) => {
          if (transcript.toLowerCase().includes(keyword.toLowerCase())) {
            setDetectedKeyword(keyword);
          }
        });
      };

      recognitionRef.current.start();
      setIsListening(true);
    } else {
      console.error('Speech Recognition API not supported in this browser');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    setDetectedKeyword('');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-center text-black mb-8">Real-time monitoring for enhanced safety and peace of mind.</h1>

        {detectedKeyword && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded-md" role="alert">
            <p className="font-bold">Keyword Detected</p>
            <p>
              The keyword "<span className="text-pink-600 font-bold">{detectedKeyword}</span>" was detected from speech.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <MonitorBox
            title="Stress Level"
            value={`${stressLevel}%`}
            icon={<Brain className="w-6 h-6" />}
            color="text-red-500"
            bgColor="bg-red-100"
          />
          <MonitorBox
            title="Pulse Rate"
            value={`${pulseRate} BPM`}
            icon={<Activity className="w-6 h-6" />}
            color="text-blue-500"
            bgColor="bg-blue-100"
            showGraph={true}
            rate={pulseRate}
          />
        </div>

        <div className="h-96 mb-8">
          <MapContainer center={[51.505, -0.09]} zoom={13} className="h-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <LiveLocationMap />
          </MapContainer>
        </div>

        <div className="flex justify-center">
          <button
            onClick={isListening ? stopListening : startListening}
            className={`flex items-center px-4 py-2 rounded-full ${
              isListening ? 'bg-pink-400 hover:bg-pink-500' : 'bg-pink-400 hover:bg-black'
            } text-white font-semibold transition-colors duration-300`}
          >
            <Mic className="w-5 h-5 mr-2" />
            {isListening ? 'Stop Listening' : 'Start Listening'}
          </button>
        </div>
      </div>
    </div>
  );
}
