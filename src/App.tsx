import "./App.css";
import { useEffect, ChangeEvent } from "react";
import { useAppDispath, useAppSelector } from "./store";
import { getWeather, updateZip } from "./store/weatherStore";
import { useDispatch } from "react-redux";


function App() {
  const dispatch = useDispatch();
  const dispatchApp = useAppDispath();
  const { weather, zipCode, error } = useAppSelector((state) => state.weather);

  const handleZipChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateZip(e.target.value));
  };

  useEffect(() => {
    dispatchApp(getWeather());
  }, [zipCode]);

  return (
    <>
      <h1>Weather by ZIP</h1>
      {weather && <h2 className="conditionText">{weather.main}</h2>}
      {error && <span className="conditionText">{error}</span>}
      <div>
        <input
          value={zipCode}
          type="number"
          placeholder="Enter a ZIP code"
          className="formInput"
          onChange={handleZipChange}
        />
      </div>
    </>
  );
}

export default App;