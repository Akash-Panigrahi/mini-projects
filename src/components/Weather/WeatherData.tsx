import type { WeatherDataType } from "./types";

function WeatherData({ data }: { data: WeatherDataType }) {
  return (
    <div className="data-list">
      <div className="data-item">Latitude: {data.latitude}</div>
      <div className="data-item">Longitude: {data.longitude}</div>
      <div className="data-item">Elevation: {data.elevation}</div>
      <div className="data-item">
        Temperature: {data.current_weather.temperature}
        {data.current_weather_units.temperature}
      </div>
      <div className="data-item">
        Wind Speed: {data.current_weather.windspeed}
        {data.current_weather_units.windspeed}
      </div>
      <div className="data-item">
        Wind Direction: {data.current_weather.winddirection}
        {data.current_weather_units.winddirection}
      </div>
    </div>
  );
}

export default WeatherData;
