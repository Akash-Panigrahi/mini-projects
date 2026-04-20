import { useEffect, useRef, useState } from "react";
import "./style.css";
import type { WeatherState } from "./types";
import WeatherData from "./WeatherData";

function Weather() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState<WeatherState>({
    error: null,
    data: null,
    loading: false,
  });
  const [geoState, setGeoState] = useState<WeatherState>({
    error: null,
    data: null,
    loading: false,
  });
  const searchDataAbortRef = useRef<AbortController>(null);

  const fetchCoordsByCity = async (signal: AbortController["signal"]) => {
    try {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=10&language=en&format=json`;
      const geoResponse = await fetch(geoUrl, { signal });
      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        return { error: `City '${query}' not found.`, data: null };
      }

      const { latitude, longitude } = geoData.results[0];

      return { error: null, data: { latitude, longitude } };
    } catch (error: any) {
      return {
        error: typeof error === "string" ? error : error?.message,
        data: null,
      };
    }
  };

  const fetchWeatherByCoords = async (
    latitude: number,
    longitude: number,
    signal: AbortController["signal"],
  ) => {
    try {
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
      const weatherResponse = await fetch(weatherUrl, { signal });
      const weatherData = await weatherResponse.json();

      if (!weatherResponse.ok)
        return { error: "Some error occured", data: null };

      return {
        error: null,
        data: {
          latitude,
          longitude,
          elevation: weatherData.elevation,
          current_weather: {
            temperature: weatherData.current_weather.temperature,
            windspeed: weatherData.current_weather.windspeed,
            winddirection: weatherData.current_weather.winddirection,
          },
          current_weather_units: {
            temperature: weatherData.current_weather_units.temperature,
            windspeed: weatherData.current_weather_units.windspeed,
            winddirection: weatherData.current_weather_units.winddirection,
          },
        },
      };
    } catch (error: any) {
      return {
        error: typeof error === "string" ? error : error?.message,
        data: null,
      };
    }
  };

  const getCurrentLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  useEffect(() => {
    const abortController = new AbortController();

    const loadGeoData = async () => {
      setGeoState({ error: null, data: null, loading: true });

      const {
        coords: { latitude, longitude },
      } = await getCurrentLocation();

      const { error, data } = await fetchWeatherByCoords(
        latitude,
        longitude,
        abortController.signal,
      );

      if (error) {
        setGeoState({
          error,
          data: null,
          loading: false,
        });
        return;
      }

      setGeoState({ error: null, data, loading: false });
    };

    loadGeoData();

    return () => {
      abortController.abort("Aborting gelocation request due to unmount");
      searchDataAbortRef.current?.abort("Abort search request due to unmount");
    };
  }, []);

  const handleSearch = async () => {
    if (!query) return;

    searchDataAbortRef.current?.abort("Aborting previous search request");

    setState({ error: "", data: null, loading: true });

    searchDataAbortRef.current = new AbortController();

    const fetchCoordsResponse = await fetchCoordsByCity(
      searchDataAbortRef.current.signal,
    );

    if (fetchCoordsResponse.error) {
      const { error } = fetchCoordsResponse;

      setState({
        error: typeof error === "string" ? error : error?.message,
        data: null,
        loading: false,
      });
      return;
    }

    const { error, data } = await fetchWeatherByCoords(
      fetchCoordsResponse.data?.latitude,
      fetchCoordsResponse.data?.longitude,
      searchDataAbortRef.current.signal,
    );

    if (error) {
      setState({
        error: typeof error === "string" ? error : error?.message,
        data: null,
        loading: false,
      });
      return;
    }

    setState({ error: null, data, loading: false });
  };

  const handleReset = () => {
    setQuery("");
    setState({ error: "", data: null, loading: false });
  };

  return (
    <div className="weather">
      <div className="geolocation-data">
        <h3>Geolocation Data</h3>

        <div className="data">
          {geoState.loading && <>Loading...</>}
          {geoState.error}
          {geoState.data && <WeatherData data={geoState.data} />}
        </div>
      </div>

      <div className="search-data">
        <h3>Search Data</h3>

        <div className="search-bar">
          <input
            placeholder="Enter city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
          <button onClick={handleReset}>Reset</button>
        </div>

        <div className="data">
          {state.loading && <>Loading...</>}
          {state.error}
          {state.data && <WeatherData data={state.data} />}
        </div>
      </div>
    </div>
  );
}

export default Weather;
