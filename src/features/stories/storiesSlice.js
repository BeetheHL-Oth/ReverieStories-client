import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi } from "../../http/axios";
import Swal from "sweetalert2";

export const fetchStories = createAsyncThunk(
  "stories/fetchStories", async (params, thunkAPI) => {
    try {
      const query = new URLSearchParams({
        page: params.page,
        tag: params.tag,
        search: params.search
      }).toString()

      const {data} = await loginApi({
        method: 'GET',
        url: '/stories?' + query //! params problem check it later
      })

      return data
    }
    catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Fetching stories error!',
        text: error.response?.data?.message
      })
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'fetching stories error')
    }
  }
)

export const storiesSlice = createSlice({
  name: "stories",
  initialState: {
    stories: [],
    storyCount: 0,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStories.pending, (state) => { 
        state.loading = true
        state.error = null
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.loading = false
        state.stories = action.payload.data
        state.storyCount = action.payload.count
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      }) 
    }  
})

export default storiesSlice.reducer