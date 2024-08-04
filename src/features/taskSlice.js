import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getAuthConfig = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get('https://mindlink-taskbackend.onrender.com/tasks', getAuthConfig());
  return response.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
  const response = await axios.post('https://mindlink-taskbackend.onrender.com/tasks', task, getAuthConfig());
  return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, stage }) => {
  const response = await axios.put(`https://mindlink-taskbackend.onrender.com/tasks/${id}`, { stage }, getAuthConfig());
  return response.data;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    new: [],
    pending: [],
    completed: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        const tasks = { new: [], pending: [], completed: [] };
        action.payload.forEach((task) => {
          tasks[task.stage].push(task);
        });
        return tasks;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.new.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const { id, stage } = action.payload;
        const taskStages = ['new', 'pending', 'completed'];
        taskStages.forEach((taskStage) => {
          const taskIndex = state[taskStage].findIndex((task) => task.id === id);
          if (taskIndex >= 0) {
            state[taskStage].splice(taskIndex, 1);
          }
        });
        state[stage].push(action.payload);
      });
  },
});

export default taskSlice.reducer;
