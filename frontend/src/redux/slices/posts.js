import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const {data} = await axios.get('/posts');
    return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
	const { data } = await axios.get('/tags');
	return data;
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
	const { data } = await axios.delete(`/post${id}`);
});

const initialState = {
	posts: {
		item: [],
		status: 'loading',
	},
	tags: {
		item: [],
		status: 'loading',
	},
}

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: {
		//Получение статей
		[fetchPosts.pending]: (state) => {
			state.posts.items = []
			state.posts.status = 'loading'
		},
		[fetchPosts.fulfilled]: (state, action) => {
			state.posts.items = action.payload
			state.posts.status = 'loaded'
		},
		[fetchPosts.pending]: (state) => {
			state.posts.items = []
			state.posts.status = 'error'
		},
		//Получение тегов
		[fetchTags.pending]: (state) => {
			state.tags.items = []
			state.tags.status = 'loading'
		},
		[fetchTags.fulfilled]: (state, action) => {
			state.tags.items = action.payload
			state.tags.status = 'loaded'
		},
		[fetchTags.pending]: (state) => {
			state.tags.items = []
			state.tags.status = 'error'
		},
		//Удаление статей
		[fetchRemovePost.pending]: (state,action) => {
			state.posts.items = state.posts.items.filter(
				(obj) => obj._id !== action.meta.arg
			);
		},  
		[fetchRemovePost.pending]: (state) => {
			state.posts.status = 'error'
		},
	},
})

export const postsReducer = postsSlice.reducer;