import {configureStore} from '@reduxjs/toolkit';
import storiesReducer from '../features/stories/storiesSlice';

const store = configureStore({
  reducer: {
    // Add your reducers here
    stories: storiesReducer
  },
});

export default store;