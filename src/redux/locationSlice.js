import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
  name: 'locations',
  initialState: [],
  reducers: {
    addLocation: (state, action) => {
      state.push(action.payload);
    },
    updateLocation: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.findIndex(loc => loc.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updatedData };
      }
    }
  }
});

export const { addLocation, updateLocation } = locationSlice.actions;
export default locationSlice.reducer;
