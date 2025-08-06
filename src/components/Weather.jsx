import React, { useState, useEffect } from 'react';

function Weather() {
  const [coords, setCoords] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocalização não suportada pelo navegador');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        setError('Permissão negada ou erro na localização');
        setLoading(false);
      }
    );
  }, []);


  useEffect(() => {
    if (!coords) return;

    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`)
      .then(res => res.json())
      .then(data => {
        setLocationName(data.address.city || data.address.town || data.address.village || 'Local desconhecido');
      })
      .catch(() => setLocationName('Local desconhecido'));
  }, [coords]);

  // Busca a previsão do tempo
  useEffect(() => {
    if (!coords) return;

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true`)
      .then(response => {
        if (!response.ok) throw new Error('Erro ao buscar dados');
        return response.json();
      })
      .then(data => {
        setWeather(data.current_weather);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [coords]);

  if (loading) return <p>Carregando previsão do tempo...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="weather">
      <h3>Previsão do tempo em {locationName}</h3>
      <p>Temperatura: {weather.temperature}°C</p>
      <p>Velocidade do vento: {weather.windspeed} km/h</p>
      <p>Direção do vento: {weather.winddirection}°</p>
    </div>
  );
}

export default Weather;
