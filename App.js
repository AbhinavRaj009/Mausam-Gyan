import React, { useEffect, useState } from 'react';
import { useWeatherData } from './useWeatherData';

const App = () => {
    const [location, setLocation] = useState({ latitude: null, longitude: null });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((success) => {
            const { latitude, longitude } = success.coords;
            setLocation({ latitude, longitude });
        });
    }, []);

    const { data, error, isLoading } = useWeatherData(location.latitude, location.longitude);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Weather Data</h1>
            <div>Temperature: {data.main.temp} K</div>
            <div>Humidity: {data.main.humidity}%</div>
            {/* Add more weather data as needed */}
        </div>
    );
};

export default App;