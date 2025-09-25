// Get hourly forecast for the next 24 hours with wind and chance of rain data, starting from current device time
export const getHourlyForecast = (forecastData) => {
  if (!forecastData || !forecastData.forecast || !forecastData.forecast.forecastday) {
    return [];
  }

  const hourlyData = forecastData.forecast.forecastday[0].hour || [];
  
  // Get current device hour
  const currentDate = new Date();
  const currentHour = currentDate.getHours(); // 0-23 format
  
  // Find the index of the current or next closest hour in the data
  const currentHourIndex = hourlyData.findIndex((hour) => {
    const forecastHour = new Date(hour.time_epoch * 1000).getHours();
    return forecastHour >= currentHour;
  });
  
  // Determine the starting index (default to 0 if no match found)
  const startIndex = currentHourIndex !== -1 ? currentHourIndex : 0;
  
  // Slice the data to get up to 24 hours starting from the current hour
  let filteredHourlyData = hourlyData.slice(startIndex, startIndex + 24);
  
  // If less than 24 hours are available, pull from the next day if possible
  if (filteredHourlyData.length < 24 && forecastData.forecast.forecastday[1]) {
    const nextDayHourlyData = forecastData.forecast.forecastday[1].hour || [];
    const remainingHoursNeeded = 24 - filteredHourlyData.length;
    const additionalHours = nextDayHourlyData.slice(0, remainingHoursNeeded);
    filteredHourlyData = [...filteredHourlyData, ...additionalHours];
  }
  
  // Format the data as expected by the UI
  return filteredHourlyData.map(item => ({
    time: new Date(item.time_epoch * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temp: item.temp_c,
    description: item.condition.text,
    icon: item.condition.icon.replace('//', 'https://'),
    windSpeed: item.wind_kph, // Wind speed in kph
    windDir: item.wind_dir, // Wind direction (e.g., "N", "NE")
    chanceOfRain: item.chance_of_rain // Chance of rain as a percentage
  }));
};

// Get 5-day forecast with UV index, wind, and chance of rain data
export const getDailyForecast = (forecastData) => {
  const dailyData = forecastData.forecast.forecastday;
  return dailyData.slice(0, 5).map(day => ({
    date: new Date(day.date_epoch * 1000).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }),
    temp: day.day.avgtemp_c,
    description: day.day.condition.text,
    icon: day.day.condition.icon.replace('//', 'https://'),
    uv: day.day.uv, // UV index for the day
    windSpeed: day.day.maxwind_kph, // Maximum wind speed for the day in kph
    chanceOfRain: day.day.daily_chance_of_rain // Chance of rain as a percentage for the day
  }));
};