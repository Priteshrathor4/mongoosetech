import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllUsers = createAsyncThunk('users/getAllUsers', async () => {
  const response = await axios.get('http://localhost:4000/api/admin/students');
  return response.data.data;
});
export const getAllUsersAttendance = createAsyncThunk('users/getAllUsersAttendance', async () => {
  const response = await axios.get('http://localhost:4000/api/admin/students/attendance');
  return response.data.data;
});

export const createUser = createAsyncThunk('users/createUser', async (user) => {
  const response = await axios.post('http://localhost:4000/api/admin/students/add', user);
  console.log('user: ', user);
  return response.data;
});

export const searchUserByEmail = createAsyncThunk('users/searchUserByEmail', async (email) => {
  const response = await axios.get(`http://localhost:4000/api/users/search/${email}`);
  return response.data;
});

export const updateUser = createAsyncThunk('users/updateUser', async (user) => {
  const response = await axios.put(`http://localhost:4000/api/users/${user.id}`, user);
  return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  await axios.delete(`http://localhost:4000/api/users/${id}`);
  return id;
});

const userSlice = createSlice({
  name: 'user',
  initialState: { users: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getAllUsersAttendance.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllUsersAttendance.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(getAllUsersAttendance.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(searchUserByEmail.fulfilled, (state, action) => {
        state.users = action.payload ? [action.payload] : [];
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
