import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import { User } from "../types/User";
import axios from "axios";
import errorMessages from "../utils/errorMessages";
import i18next from "i18next";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // Backend API
  headers: {
    "Content-Type": "application/json",
  },
});

type LoginFormValues = {
  username: string;
  password: string;
};

type ResultValues = {
  id?: number;
  access_token?: string;
  username?: string;
  email?: string;
  inserttime?: number;
  updatetime?: number;
};

type KnownError = {
  errorMessage: string;
};

type ResponseValues = {
  data: {
    email: string;
    access_token: string;
  };
};

const setAuthParams = async (data: any) => {
  const lang = i18next.language || "tr";
  localStorage.setItem("lang", lang);
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("accessToken", data.access_token);
  const user: any = data.user;

  //login olduktan sonra user bilgilerini çekmek için halihazırda yazdığım fonksiyonları burada dispatch ile çalıştıracağım.
  return user;
};

export const postLogin = createAsyncThunk<
  ResultValues,
  LoginFormValues,
  { rejectValue: KnownError; error: object }
>("auth/login", async (userData, { rejectWithValue }) => {
  const { username, password } = userData;
  try {
    const response = await axiosInstance.post<LoginFormValues, ResponseValues>(
      "login",
      { username, password }
    );
    localStorage.clear();
    const result = await setAuthParams(response.data);

    return result as ResultValues;
  } catch (err: any) {
    return rejectWithValue({
      errorMessage: errorMessages(err.response),
    });
  }
});

// export const postLogout = createAsyncThunk("auth/logout", async () => {
//   localStorage.clear();
// });

// Define a type for the slice state
interface AuthState {
  user: ResultValues;
  isLoggedIn: boolean;
  isLoading: boolean;
  errorMessage: string | null;
}

const initialState: AuthState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : {},
  isLoggedIn: localStorage.getItem("accessToken") ? true : false,
  isLoading: false,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postLogin.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(postLogin.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.errorMessage = action.payload.errorMessage;
        } else if (action.error.message) {
          state.errorMessage = action.error.message;
        }
      });
    //   .addCase(postLogout.pending, (state, action) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(postLogout.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //   })
    //   .addCase(postLogout.rejected, (state, action) => {
    //     state.isLoading = false;
    //   })
  },
});

export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer;
