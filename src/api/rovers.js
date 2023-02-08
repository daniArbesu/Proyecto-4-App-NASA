/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

export const apiHeaders = {
  'Content-type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  Accept: 'application/json'
};

export const API_ROVER = axios.create({
  headers: apiHeaders,
  baseURL: import.meta.env.VITE_APP_NASA_API_ROVER_URL,
  timeout: 6000
});

export const getRoverPhotos = async (date) => {
  try {
    const response = await API_ROVER.get(
      `/planetary/apod?date=${date}&api_key=${import.meta.env.VITE_APP_NASA_API_KEY}`
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
