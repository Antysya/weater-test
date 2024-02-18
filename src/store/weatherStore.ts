import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { store } from ".";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const appId = "2371e9f492f60d40b936208c00390511";

const weatherSlice = createSlice({
  name: "weatherSlice",
  initialState: {
    weather: null,
    isLoading: false,
    error: null,
    zipCode: "101000",
    countryCode: "ru",
  },
  reducers: {
    updateZip(state, action) {
      state.zipCode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWeather.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getWeather.fulfilled, (state, action) => {
      state.weather = action.payload;
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(getWeather.rejected, (state, action) => {
      state.error = action.payload;
      state.weather = null;
      state.isLoading = false;
    });
  },
});

export const getWeather = createAsyncThunk(
  "weatherSlice/getWeather",
  async function (_, { rejectWithValue }) {
    if (store.getState().weather.zipCode.length === 6) {
      try {
        const response = await axios.get(baseUrl, {
          params: {
            zip: `${store.getState().weather.zipCode},${
              store.getState().weather.countryCode
            }`,
            appid: appId,
          },
        });
        if (response.status === 200) {
          console.log(response);
          return response.data.weather[0];
        }
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const { updateZip } = weatherSlice.actions;
export default weatherSlice.reducer;