import { useState, useEffect } from 'react';
import { WeatherApiResult } from '../../types/weather';
import { format } from 'date-fns';
// MaterialUI
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
// Map
import Map from '../map/Map';
//============================================================================//
/* 
  Default to demo-team location, Berlin - DE, for the moment.
*/
//TODO: Remember to change, now hard-coded, location and country to be dynamically adjusted according to team location and/or upcoming match location.

function WeatherWidget() {
  const [weatherForecast, setWeatherForecast] = useState<WeatherApiResult | null | undefined>(null);
  const handleWeatherApiCall = async() => {
    setWeatherForecast(await get5DayForecast());
  }

  async function get5DayForecast() {
    try {
      let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Berlin,DE&units=metric&appid=${process.env.REACT_APP_WEATHER}`)

      if(response.ok) {
        let data:WeatherApiResult = await response.json();
        let timeForForecast = data.list[0].dt_txt.split(" ")[1];
        let fiveDayForecast = data.list.filter((forecast) => {
          if(forecast.dt_txt.split(" ")[1] === timeForForecast) {
            return forecast;
          }
        });

        return {
          city: data.city,
          list: fiveDayForecast
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  useEffect(() => {
    handleWeatherApiCall();
  }, [])

  return (
    <Paper elevation={1} sx={{ width: '100%', padding: '1rem' }}>
      <Typography variant="h5" fontWeight={500}>
        Forecast{' '}
        {`${weatherForecast?.city.name}, ${weatherForecast?.city.country}`}
      </Typography>
      <Stack direction="row" mt="2rem">
        {weatherForecast &&
          weatherForecast.list.map((dayForecast) => {
            return (
              <Box
                key={dayForecast.dt_txt}
                display="flex"
                flexDirection="column"
                alignItems="center"
                width="100%"
              >
                <Typography variant="body1" fontWeight={500}>
                  {format(
                    new Date(dayForecast.dt_txt.split(' ')[0]),
                    'iiii, do',
                  )}
                </Typography>
                <Box display="flex" alignItems="center">
                  <Box
                    component="img"
                    src={`https://openweathermap.org/img/wn/${dayForecast.weather[0].icon}@2x.png`}
                  />
                  <Box>
                    <Typography variant="body2" fontWeight={500}>
                      {`${Math.round(dayForecast.main.temp)}`}
                      &deg;C
                    </Typography>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    textTransform={'capitalize'}
                  >
                    {dayForecast.weather[0].description}
                  </Typography>
                  <Typography variant="caption" fontWeight="500" mt={1}>
                    Min: {`${Math.round(dayForecast.main.temp_min)}`}&deg;C
                  </Typography>
                  <Typography variant="caption" fontWeight="500">
                    Max: {`${Math.round(dayForecast.main.temp_max)}`}&deg;C
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    Feels like: {`${Math.round(dayForecast.main.feels_like)}`}&deg;C
                  </Typography>
                </Box>
              </Box>
            );
          })}
        {!weatherForecast && (
          <Typography variant="body1">
            Unfortunately something went wrong with providing current weather
            information. Check again later.
          </Typography>
        )}
      </Stack>
          <Map />
    </Paper>
  );
}
export default WeatherWidget;