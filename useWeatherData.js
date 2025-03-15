import { useQuery } from '@tanstack/react-query';

const fetchWeatherData = async (latitude, longitude) => {
    const API_KEY = '07e0e3da82bb8a4e32784a06b8de9424';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const useWeatherData = (latitude, longitude) => {
    return useQuery(['weatherData', latitude, longitude], () => fetchWeatherData(latitude, longitude), {
        enabled: !!latitude && !!longitude, // Only run the query if latitude and longitude are available
    });
};