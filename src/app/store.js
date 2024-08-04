import { configureStore } from '@reduxjs/toolkit';
import taskSlice from '../features/taskSlice';


const store = configureStore({
  reducer: {
    tasks: taskSlice,
  },
});

export default store;
