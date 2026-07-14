import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as api from "../Api.js";
import { clearAuthSession } from "../../utils/authStorage.js";

function logouterror() {
  toast.error("Token Expired");
  clearAuthSession();
  setTimeout(() => {
    window.location.replace("/");
  }, 1000);
}

export const getAllUser = createAsyncThunk("user/getAllUser", async (_, { rejectWithValue }) => {
  try {
    const response = await api.getAllUser();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const getUserId = createAsyncThunk("user/userId", async (_, { rejectWithValue }) => {
  try {
    const response = await api.getUserId();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const createUser = createAsyncThunk("user/create", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.createUser(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const editUser = createAsyncThunk("user/editUser", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.editUser(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const deleteUser = createAsyncThunk("user/delete", async (userData, { rejectWithValue }) => {
  try {
    const response = await api.deleteUser(userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
    loading: false,
    error: null,
    message: null,
    userIdAndUrl: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch users";
        if (action.payload.message == "Unauthenticated.") logouterror();
      })
      .addCase(getUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.userIdAndUrl = action.payload.data;
      })
      .addCase(getUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch users";
        if (action.payload.message == "Unauthenticated.") logouterror();
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.message = "User created successfully";
        toast.success(action.payload.message || "User created successfully");
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.errors || "User creation failed";
        if (action.payload.message == "Unauthenticated.") logouterror();
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.message = "User updated successfully";
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update user";
        if (action.payload.message == "Unauthenticated.") logouterror();
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.message = "User Deleted successfully";
        toast.success(action.payload.message || "User deleted successfully");
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete user";
        toast.error(action.payload.message || "Failed to delete user");
        if (action.payload.message == "Unauthenticated.") logouterror();
      });
  },
});

export default userSlice.reducer;
