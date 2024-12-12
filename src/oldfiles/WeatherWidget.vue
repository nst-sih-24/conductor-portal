<template>
  <q-card class="weather-card" :style="{ backgroundImage: 'url(' + bgImageUrl + ')', backgroundSize: 'cover' }">
    <div class="q-card-section text-white" style="display: flex; justify-content: space-between; align-items: center; padding: 0 15px; height: 100%;">
      <!-- Left side: Weather icon and description -->
      <div class="description" style="display: flex; align-items: center; font-size: 24px; font-weight: 400; letter-spacing: 0.5px;">
        <q-icon :name="weatherIcon" size="2em" style="margin-right: 20px;" />
        {{ weatherDescription }}
      </div>

      <!-- Right side: Temperature -->
      <div class="temperature" style="font-size: 30px; font-weight: bold; letter-spacing: 1px;">
        {{ temperature }}°C
      </div>
    </div>
  </q-card>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'WeatherComponent',

  setup() {
    const temperature = ref(null);
    const weatherDescription = ref('');
    const weatherIcon = ref('');
    const bgImageUrl = ref('');

    const apiKey = 'c2a177b38371233ec459d1158924de81';
    const city = 'London'; // or any city you want to monitor

    const fetchWeather = async () => {
      try {
        // Modify the unit to 'metric' to get Celsius
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const data = await response.json();

        // Update the temperature in Celsius and description
        temperature.value = data.main.temp.toFixed(1);  // Convert to Celsius and round to 1 decimal
        weatherDescription.value = data.weather[0].main;

        // Set weather icon based on condition
        setWeatherIcon(weatherDescription.value);

        // Update the background based on weather
        updateBackground(weatherDescription.value);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    const setWeatherIcon = (weatherCondition) => {
      switch (weatherCondition) {
        case 'Clear':
          weatherIcon.value = 'wb_sunny';  // Sun icon for clear weather
          break;
        case 'Clouds':
          weatherIcon.value = 'cloud';  // Cloud icon for cloudy weather
          break;
        case 'Rain':
          weatherIcon.value = 'umbrella';  // Umbrella icon for rainy weather
          break;
        case 'Snow':
          weatherIcon.value = 'ac_unit';  // Snowflake icon for snowy weather
          break;
        default:
          weatherIcon.value = 'cloud';  // Default to a cloud icon
      }
    };

    const updateBackground = (weatherCondition) => {
      if (weatherCondition.includes('Clear')) {
        bgImageUrl.value = 'https://media.istockphoto.com/id/612023744/photo/blue-and-orange-sunset-sky.jpg?s=612x612&w=0&k=20&c=bqPHaI4d3ghIbLIwtbTDPxV8QQ2pIN2mbCfzLb7gucQ=';
      } else if (weatherCondition.includes('Cloud')) {
        bgImageUrl.value = 'https://img.freepik.com/free-photo/field-yellow-flowers-with-hills-cloudy-sky_181624-14655.jpg';
      } else if (weatherCondition.includes('Rain')) {
        bgImageUrl.value = 'https://static.vecteezy.com/system/resources/previews/042/146/565/non_2x/ai-generated-beautiful-rain-day-view-photo.jpg';
      } else if (weatherCondition.includes('Snow')) {
        bgImageUrl.value = 'https://images.unsplash.com/photo-1477601263568-180e2c6d046e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c25vd3xlbnwwfHwwfHx8MA%3D%3D';
      } else {
        bgImageUrl.value = 'https://your-image-url.com/default.jpg';
      }
    };

    onMounted(() => {
      fetchWeather();
      // You can use a setInterval to update the weather every x minutes if desired
      // setInterval(fetchWeather, 600000); // Updates every 10 minutes
    });

    return {
      temperature,
      weatherDescription,
      weatherIcon,
      bgImageUrl,
    };
  },
};
</script>

<style scoped>
.weather-card {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px; /* Set to 60px */
  width: 100%; /* Set to 100% width */
  font-family: 'Poppins', sans-serif; /* Modern, clean font family */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Slight shadow for a more dynamic look */
}

.q-card-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 15px; /* Horizontal padding */
}

.description {
  font-size: 18px;
  font-weight: 600;
  color: black;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  margin-right: 30px; /* Add margin to the right of the icon for spacing */
}

.temperature {
  font-size: 30px; /* Larger font size for temperature */
  font-weight: bold;
  letter-spacing: 1px; /* Slight spacing between characters for the temperature */
  color: black;
}
</style>
