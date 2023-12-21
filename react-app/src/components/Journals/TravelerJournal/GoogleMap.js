import React, { useEffect, useState } from 'react';

const MYAPIKEY = process.env.REACT_APP_API_MAP;

const Map = ({ country }) => {
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            country
          )}&key=${MYAPIKEY}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch coordinates for the country.');
        }

        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setCoordinates({ lat, lng });
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };

    fetchCoordinates();
  }, [country]);

  return (
    <div style={{ width: '500px', height: '500px' }}>
      <iframe
        title="Country Map"
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src={`https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=5&output=embed`}
      ></iframe>
    </div>
  );
};

export default Map;
