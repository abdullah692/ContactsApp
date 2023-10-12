import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Axios from "../utils/axiosConfig";
import authHeader from "../services/authHeader";

const initialState={
    contacts:''
}



export const getContacts = createAsyncThunk(
    'contacts/getContacts',
    async (data, { rejectWithValue }) => {
      console.log('data',data)
      try {
        // debugger
        const apiRes = await Axios.get(
          `${process.env.REACT_APP_BACKEND_API_URL}/api/contacts/`,
          { headers: authHeader(),
        withCredentials:true }
        )
        console.log('Api Res Sumit App', apiRes.data)
        return apiRes?.data
      } catch (error) {
        return rejectWithValue(error)
      }
    }
  )
  




export const postContacts = createAsyncThunk(
    'contacts/postContacts',
    async ({ contactData}, { rejectWithValue }) => {
      console.log('data',contactData)
      try {
        // debugger
        const apiRes = await Axios.post(
          `${process.env.REACT_APP_BACKEND_API_URL}/api/contacts/`,
          contactData,
          { headers: authHeader(),
        withCredentials:true }
        )
        console.log('Api Res Sumit App', apiRes.data)
        return apiRes?.data
      } catch (error) {
        return rejectWithValue(error)
      }
    }
  )
  

  

export const updateContacts = createAsyncThunk(
  'contacts/updateContacts',
  async ({ contactData}, { rejectWithValue }) => {
    console.log('data',contactData)
    try {
      // debugger
      const apiRes = await Axios.put(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/contacts/${contactData._id}`,
        contactData,
        { headers: authHeader(),
      withCredentials:true }
      )
      console.log('Api Res Sumit App', apiRes.data)
      return apiRes?.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)


  
  export const deleteContacts = createAsyncThunk(
    'contacts/deleteContacts',
    async ({ id }, { rejectWithValue }) => {
      console.log('dataId',id)
      try {
        
        const apiRes = await Axios.delete(
          `${process.env.REACT_APP_BACKEND_API_URL}/api/contacts/${id}`,

          { headers: authHeader(),
        withCredentials:true }
        )
        console.log('Api Res Delete', apiRes.data)
        return apiRes?.data
      } catch (error) {
        return rejectWithValue(error)
      }
    }
  )
  
 


const contactSlice=createSlice({
    name:'contacts',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        
    }
})

export default contactSlice.reducer;