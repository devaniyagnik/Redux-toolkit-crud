
import { createSlice } from "@reduxjs/toolkit";

export const crudSlice = createSlice({
  name: "crud",
  initialState: {
    data: [
      {
        contact: "1234567890",
        dob: "2014-10-25",
        email: "laduco@mailinator.com",
        fullname: "Rhea Cochran",
        gender: "female",
        image: null,
        languages: ["English"],
        nationality: "UK",
      },
      {
        contact: "1234567890",
        dob: "1983-01-15",
        email: "migyx@mailinator.com",
        fullname: "Gil Humphrey",
        gender: "female",
        image: null,
        languages: ["English", "Gujarati"],
        nationality: "USA",
      },
    ],
  },
  reducers: {
    addData: (state,action) => {
      // Case: Adding data to the state
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    },
    deleteData: (state,action) => {
      // Case: Deleting data from the state
      return {
        ...state,
        data: state.data.filter((item, index) => index !== action.payload),
      };
    },
    updateData: (state,action) => {
      // Case: Updating data in the state
      console.log(action.payload.id,action.payload.data)
      return {
        ...state,
        data: state.data.map((item, index) =>
          index === action.payload.id ? action.payload.data : item
        ),
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { addData, deleteData, updateData } = crudSlice.actions;

export default crudSlice.reducer;
