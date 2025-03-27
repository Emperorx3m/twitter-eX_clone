import { createSlice } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';
import { darkTheme, lightTheme } from 'utils/theme';

const getSystemTheme = () => (Appearance.getColorScheme() === 'dark' ? 'dark' : 'light');

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: getSystemTheme(),
    theme: getSystemTheme() === 'dark' ? darkTheme : lightTheme, 
    systemMode: true, 
  },
  reducers: {
    setTheme: (state, action) => {
      if (action.payload === 'system') {
        state.systemMode = true;
        state.mode = getSystemTheme();
      } else {
        state.systemMode = false;
        state.mode = action.payload;
      }
      state.theme = state.mode === 'dark' ? darkTheme : lightTheme;
    },
    updateSystemTheme: (state) => {
      if (state.systemMode) {
        state.mode = getSystemTheme();
        state.theme = state.mode === 'dark' ? darkTheme : lightTheme;
      }
    },
  },
});

export const { setTheme, updateSystemTheme } = themeSlice.actions;
export default themeSlice.reducer;
