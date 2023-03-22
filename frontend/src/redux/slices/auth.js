import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
	const {data} = await axios.post('/auth/login', params);
	return data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
	const { data } = await axios.post('/auth/register', params)
	return data
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthME', async () => {
	const { data } = await axios.get('/auth/me')
	return data
})

const initialState = {
	data: null,
	status: 'loading',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.data = null
		},
	},
	extraReducers: {
		[fetchAuth.pending]: (state) => {
			state.posts.items = null
			state.posts.status = 'loading'
		},
		[fetchAuth.fulfilled]: (state, action) => {
			state.items = action.payload
			state.status = 'loaded'
		},
		[fetchAuth.pending]: (state) => {
			state.items = null
			state.status = 'error'
		},
		[fetchRegister.pending]: (state) => {
			state.posts.items = null
			state.posts.status = 'loading'
		},
		[fetchRegister.fulfilled]: (state, action) => {
			state.items = action.payload
			state.status = 'loaded'
		},
		[fetchRegister.pending]: (state) => {
			state.items = null
			state.status = 'error'
		},
		[fetchAuthMe.pending]: (state) => {
			state.posts.items = null
			state.posts.status = 'loading'
		},
		[fetchAuthMe.fulfilled]: (state, action) => {
			state.items = action.payload
			state.status = 'loaded'
		},
		[fetchAuthMe.pending]: (state) => {
			state.items = null
			state.status = 'error'
		},
	},
})

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const {logout} = authSlice.actions;