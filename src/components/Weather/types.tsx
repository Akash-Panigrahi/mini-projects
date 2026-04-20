export type WeatherDataType = {
  latitude: number;
  longitude: number;
  elevation: number;
  current_weather: {
    temperature: number;
    windspeed: number;
    winddirection: number;
  };
  current_weather_units: {
    temperature: "°C";
    windspeed: "km/h";
    winddirection: "°";
  };
};

export type WeatherState = {
  error: string | null;
  loading: boolean;
  data: WeatherDataType | null;
};
