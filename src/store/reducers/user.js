import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLogin as reqFetchLogin } from "../../lib/apis/auth";
const initialState = {
  isLoggedIn: false,
  userInfo: null,
  loading: "idle",
};

const fetchLogin = createAsyncThunk(
  "user/fetchLogin",
  async (data, thunkAPI) => {
    try {
      const response = await reqFetchLogin(data);
      return response; //액션의 payload;
    } catch (error) {
      alert("잘못된 로그인 정보입니다.");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.userInfo = null;
      state.loading = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      console.log("fulfilled");
      console.log(action);

      state.loading = "fulfilled";
      state.userInfo = action.payload;
      state.isLoggedIn = true;
    });
    builder.addCase(fetchLogin.pending, (state, action) => {
      console.log("pending");

      state.loading = "pending";
      state.userInfo = null;
      state.isLoggedIn = false;

      console.log(action);
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      console.log("rejected");

      state.loading = "rejected";
      state.userInfo = null;
      state.isLoggedIn = false;

      console.log(action);
    });
  },
});

export { fetchLogin };
export const { logout } = userSlice.actions;
export default userSlice.reducer;
