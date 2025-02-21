import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Record } from "../types/Record";

export const getIncomes = createAsyncThunk("incomes", async () => {
  try {
    const response = await axios.get(
      `get-records?start=0&count=10&type=income`
    );
    const { data } = response;
    const incomes: any = {};
    data?.forEach((el: any) => {
      incomes[el?.id] = el;
    });
    localStorage.setItem("incomes", JSON.stringify(incomes));
    return incomes;
  } catch (err: any) {
    console.log("getIncomesErr", err);
    //   return {
    //     errorMessage: errorMessages(err.response, "login:errors"),
    //   };
  }
});

interface IncomesState {
  incomes: Record[];
  start: number;
  count: number;
  //errorMessage: any | null;
  //page: number;
  //filters: Record<string, unknown>;
}

const initialIncomeState: IncomesState = {
  incomes: JSON.parse(localStorage.getItem("incomes") || "{}"),
  start: 0,
  count: 10,
  //errorMessage: "",
  //page: 0,
  //filters: {},
};

export const incomesSlice = createSlice({
  name: "incomes",
  initialState: initialIncomeState,
  reducers: {},
});

const initialOutcomeState: IncomesState = {
  incomes: JSON.parse(localStorage.getItem("outcomes") || "{}"),
  start: 0,
  count: 10,
  //errorMessage: "",
  //page: 0,
  //filters: {},
};

export const outcomesSlice = createSlice({
  name: "outcomes",
  initialState: initialOutcomeState,
  reducers: {},
});
export const incomesReducer = incomesSlice.reducer;
export const outcomesReducer = outcomesSlice.reducer;
