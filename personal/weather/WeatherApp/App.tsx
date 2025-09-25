import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, FlatList, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { getWeatherByCity, getWeatherByCoords } from './src/services/weather';
import { getHourlyForecast, getDailyForecast } from './src/utils/forecastUtils';

export default function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permission to access location was denied');
          return;
        }

        setLoading(true);
        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        
        const data = await getWeatherByCoords(latitude, longitude);
        setWeatherData(data);
        setHourlyForecast(getHourlyForecast(data));
        setDailyForecast(getDailyForecast(data));
      } catch (err) {
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSearch = async () => {
    if (!city) return;
    try {
      setLoading(true);
      setError(null);
      
      const data = await getWeatherByCity(city);
      setWeatherData(data);
      setHourlyForecast(getHourlyForecast(data));
      setDailyForecast(getDailyForecast(data));
      
      setCity('');
    } catch (err) {
      setError('City not found or error fetching data');
    } finally {
      setLoading(false);
    }
  };

  // Function to determine background color and text color based on weather condition
  const getBackgroundAndTextColor = (condition) => {
    if (!condition) return { backgroundColor: '#f5f5f5', textColor: '#000' }; // Default if no condition
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return { backgroundColor: '#FFF8DC', textColor: '#000' }; // Light yellow for sunny/clear
    } else if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
      return { backgroundColor: '#D3D3D3', textColor: '#000' }; // Light gray for cloudy/overcast
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle') || conditionLower.includes('shower')) {
      return { backgroundColor: '#B0E0E6', textColor: '#000' }; // Light blue for rain
    } else if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
      return { backgroundColor: '#778899', textColor: '#FFF' }; // Dark slate gray for thunderstorm, white text for contrast
    } else if (conditionLower.includes('snow') || conditionLower.includes('sleet')) {
      return { backgroundColor: '#E0FFFF', textColor: '#000' }; // Very light cyan for snow
    } else if (conditionLower.includes('mist') || conditionLower.includes('fog')) {
      return { backgroundColor: '#E8E8E8', textColor: '#000' }; // Very light gray for mist/fog
    } else {
      return { backgroundColor: '#f5f5f5', textColor: '#000' }; // Default light gray background
    }
  };

  const renderHourlyItem = ({ item }) => (
    <View style={styles.forecastItem}>
      <Text style={[styles.forecastTime, { color: textColor }]}>{item.time}</Text>
      <Image
        style={styles.smallIcon}
        source={{ uri: item.icon }}
      />
      <Text style={[styles.forecastTemp, { color: textColor }]}>{item.temp} °C</Text>
      <Text style={[styles.forecastDesc, { color: textColor }]}>{item.description}</Text>
      <Text style={[styles.forecastWind, { color: textColor }]}>Wind: {item.windSpeed} kph {item.windDir}</Text>
      <Text style={[styles.forecastRain, { color: textColor }]}>Rain: {item.chanceOfRain}%</Text>
    </View>
  );

  const renderDailyItem = ({ item }) => (
    <View style={styles.forecastItem}>
      <Text style={[styles.forecastDate, { color: textColor }]}>{item.date}</Text>
      <Image
        style={styles.smallIcon}
        source={{ uri: item.icon }}
      />
      <Text style={[styles.forecastTemp, { color: textColor }]}>{item.temp} °C</Text>
      <Text style={[styles.forecastDesc, { color: textColor }]}>{item.description}</Text>
      <Text style={[styles.forecastUV, { color: textColor }]}>UV Index: {item.uv}</Text>
      <Text style={[styles.forecastWind, { color: textColor }]}>Max Wind: {item.windSpeed} kph</Text>
      <Text style={[styles.forecastRain, { color: textColor }]}>Rain: {item.chanceOfRain}%</Text>
      
    </View>
  );

  // Calculate snap interval based on item width + margin
  const itemWidth = 120; // minWidth from forecastItem style
  const itemMargin = 10; // marginRight from forecastItem style
  const snapInterval = itemWidth + itemMargin;

  // Set dynamic background and text color for the entire app
  const { backgroundColor, textColor } = weatherData 
    ? getBackgroundAndTextColor(weatherData.current.condition.text) 
    : { backgroundColor: '#f5f5f5', textColor: '#000' };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>Weather App</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter city name"
          value={city}
          onChangeText={setCity}
        />
        <Button title="Search" onPress={handleSearch} disabled={loading} />
      </View>

      {loading && <Text style={[styles.loading, { color: textColor }]}>Loading...</Text>}
      {error && <Text style={[styles.error, { color: textColor }]}>{error}</Text>}
      {weatherData && !loading && (
        <View style={styles.weatherContainer}>
          <Text style={[styles.cityName, { color: textColor }]}>{weatherData.location.name}</Text>
          <View style={styles.weatherContent}>
            <View style={styles.weatherMain}>
              <Text style={[styles.temp, { color: textColor }]}>{weatherData.current.temp_c} °C</Text>
              <Text style={[styles.description, { color: textColor }]}>
                {weatherData.current.condition.text}
              </Text>
              <Image
                style={styles.icon}
                source={{ uri: weatherData.current.condition.icon.replace('//', 'https://') }}
              />
            </View>
            <View style={styles.weatherDetailsRight}>
              <Text style={[styles.detailText, { color: textColor }]}>UV Index: {weatherData.current.uv}</Text>
              <Text style={[styles.detailText, { color: textColor }]}>Wind: {weatherData.current.wind_kph} kph {weatherData.current.wind_dir}</Text>
              <Text style={[styles.detailText, { color: textColor }]}>Precip: {weatherData.current.precip_mm} mm</Text>
              <Text style={[styles.detailText, { color: textColor }]}>Humidity: {weatherData.current.humidity}%</Text>
              <Text style={[styles.detailText, { color: textColor }]}>Pressure: {weatherData.current.pressure_mb} mb</Text>
              </View>
          
          </View>
        </View>
      )}

      {hourlyForecast.length > 0 && (
        <View style={styles.forecastContainer}>
          <Text style={[styles.forecastTitle, { color: textColor }]}>Hourly Forecast (Next 24 Hours)</Text>
          <FlatList
            data={hourlyForecast}
            renderItem={renderHourlyItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.forecastList}
            snapToInterval={snapInterval}
            snapToAlignment="start"
            decelerationRate="fast"
          />
        </View>
      )}

      {dailyForecast.length > 0 && (
        <View style={styles.forecastContainer}>
          <Text style={[styles.forecastTitle, { color: textColor }]}>5-Day Forecast</Text>
          <FlatList
            data={dailyForecast}
            renderItem={renderDailyItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.forecastList}
            snapToInterval={snapInterval}
            snapToAlignment="start"
            decelerationRate="fast"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: '#fff', // Keep input field white for readability
  },
  loading: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  error: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  weatherContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white for contrast
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 20,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  weatherContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherMain: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  temp: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 18,
    textTransform: 'capitalize',
    marginBottom: 10,
  },
  icon: {
    width: 100,
    height: 100,
  },
 weatherDetailsRight: {
  flex: 1,
  justifyContent: 'center',
  marginLeft: 10,
},
detailText: {
  fontSize: 12, // Reduced from 14 to fit more items
  marginBottom: 3, // Reduced from 5 for tighter spacing
  textAlign: 'right',
},
  forecastContainer: {
    marginBottom: 20,
  },
  forecastTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  forecastList: {
    paddingHorizontal: 5,
  },
  forecastItem: {
    backgroundColor: '#fff', // Keep forecast items white for contrast
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    alignItems: 'center',
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  forecastTime: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  forecastDate: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  forecastTemp: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  forecastDesc: {
    fontSize: 12,
    textTransform: 'capitalize',
    textAlign: 'center',
    marginBottom: 3,
  },
  forecastUV: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 3,
  },
  forecastWind: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 3,
  },
  forecastRain: {
    fontSize: 12,
    textAlign: 'center',
  },
  smallIcon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
});