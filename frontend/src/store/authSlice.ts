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

// type oauthValues = {
//   credential: string;
// };

type LoginFormValues = {
  username: string;
  password: string;
};

type SignUpFormValues = {
  username: string;
  email: string;
  password: string;
};

type ResultValues = {
  id?: number;
  username?: string;
  email?: string;
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

// export const postOauth = createAsyncThunk<
//   ResultValues,
//   oauthValues,
//   { rejectValue: KnownError; error: object }
// >("auth/google-auth", async (credentialData, { rejectWithValue }) => {
//   const credential = credentialData;
//   try {
//     const response = await axiosInstance.post<oauthValues, ResponseValues>(
//       "google-auth",
//       { token: credential }
//     );
//     localStorage.clear();
//     const result = await setAuthParams(response.data);

//     return result as ResultValues;
//   } catch (err: any) {
//     return rejectWithValue({
//       errorMessage: errorMessages(err.response),
//     });
//   }
// });

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

export const postSignUp = createAsyncThunk<
  ResultValues,
  SignUpFormValues,
  { rejectValue: KnownError; error: object }
>("auth/sign-up", async (userData, { rejectWithValue }) => {
  const { username, email, password } = userData;
  try {
    const response = await axiosInstance.post<LoginFormValues, ResponseValues>(
      "sign-up",
      { username, email, password }
    );
    localStorage.clear();

    const result = response.data;
    return result as ResultValues;
  } catch (err: any) {
    return rejectWithValue({
      errorMessage: errorMessages(err.response),
    });
  }
});

export const postLogout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    try {
      dispatch(logout());
    } catch (err: any) {
      return {
        errorMessage: errorMessages(err.response),
      };
    }
  }
);

// Define a type for the slice state
interface AuthState {
  user: ResultValues;
  isLoggedIn: boolean;
  isLoading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
  theme: string | null;
}

const initialState: AuthState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : {},
  isLoggedIn: localStorage.getItem("accessToken") ? true : false,
  isLoading: false,
  errorMessage: null,
  successMessage: null,
  theme: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // burada mesela kullanıcıya ait incomes diye bir alan olacak setIncomes diye bir fonksiyon yazıp ilgili yerde dispatch edeceğim
    // setUser: (state, action) => {
    //   state.user = action.payload;
    // },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = {};
      state.errorMessage = null;
      state.isLoading = false;
      localStorage.clear();
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
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
      })
      .addCase(postLogout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postLogout.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(postLogout.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(postSignUp.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(postSignUp.fulfilled, (state) => {
        state.isLoading = false;
        state.successMessage = i18next.t("welcome_page:sign_up_success");
        state.errorMessage = null;
      })
      .addCase(postSignUp.rejected, (state, action) => {
        state.isLoading = false;
        state.successMessage = null;
        if (action.payload) {
          state.errorMessage = action.payload.errorMessage;
        } else if (action.error.message) {
          state.errorMessage = action.error.message;
        }
      });
  },
});

export const { logout, setErrorMessage, setTheme } = authSlice.actions;

export default authSlice.reducer;
