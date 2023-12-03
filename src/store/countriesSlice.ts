import { countries } from '../models/countries';
import { createSlice } from '@reduxjs/toolkit';

const CountriesSlice = createSlice({
  name: 'countries',
  initialState: countries,
  reducers: {},
});

export default CountriesSlice.reducer;
