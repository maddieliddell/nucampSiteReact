
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import { COMMENTS } from '../../app/shared/COMMENTS';
import { baseUrl } from '../../app/shared/baseUrl';

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async () => {
        const response = await fetch(baseUrl + 'comments');
        if (!response.ok) {
            return Promise.reject('Unable to fetch, status: ' + response.status);
        }
        const data = await response.json();
        return data;
    }
);
export const postComment = createAsyncThunk(
    'comments/postComment',
    async (comment) => {
        const response = await fetch(baseUrl + 'comments', {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            return Promise.reject('Failed to post comment, status: ' + response.status);
        }

        const data = await response.json();
        return data; 
    }
);

const initialState = {
    commentsArray: [],
    isLoading: true,
    errMsg: ''
};

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComment: (state, action) => {
            state.commentsArray.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.errMsg = '';
                state.commentsArray = action.payload; 
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error ? action.error.message : 'Fetch failed';
            })
            .addCase(postComment.fulfilled, (state, action) => {
                state.commentsArray.push(action.payload); 
            })
            .addCase(postComment.rejected, (state, action) => {
                alert('Failed to add comment: ' + action.error.message); 
            });
    }
});

export const commentsReducer = commentsSlice.reducer;
export const { addComment } = commentsSlice.actions;

export const selectCommentsByCampsiteId = (campsiteId) => (state) => {
    return state.comments.commentsArray.filter(
        (comment) => comment.campsiteId === parseInt(campsiteId)
    );
};
