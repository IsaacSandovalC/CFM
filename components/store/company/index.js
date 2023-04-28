import { createSlice } from "@reduxjs/toolkit";
import Company from "/Directus/SDKDirectus/services/Company"

export const companySlise = createSlice({
  name: "companyData",
  initialState: {
    data: null,
  },

  reducers: {
    setCompanyData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setCompanyData } = companySlise.actions;
export default companySlise.reducer;

export const getInitialConten =(setLoading) => (dispatch) => {
  setLoading(true);
  Company.getInitialContent()
    .then((data) => {
      dispatch(setCompanyData({ ...data }));
    })
    .finally(() => setLoading(false));
};
