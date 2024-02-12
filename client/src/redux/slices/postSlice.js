import { createSlice } from "@reduxjs/toolkit";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: [],
        post: null,
        postsCount: null,
        postsCate: [],
        loading: false,
        isPostCreated: false,
        isPostDelete: false
    },
    reducers: {

        setPosts(state, action) {
            state.posts = action.payload;
            state.loading = false;
        },

        setPost(state, action) {
            state.post = action.payload;
        },

        setDeletePost(state, action) {
            state.posts = state.posts.filter(p => p._id !== action.payload);
        },

        // in case the post already deleted
        setIsPostDelete(state) {
            state.isPostDelete = true;
        },

        // back the [isPostDelete] to initial value
        ClearIsPostDelete(state) {
            state.isPostDelete = false;
        },

        setPostsCount(state, action) {
            state.postsCount = action.payload;
        },

        setIsPostCreated(state) {
            state.isPostCreated = true;
            state.loading = false;
        },

        setPostsCate(state, action) {
            state.postsCate = action.payload;
        },

        setLike(state, action) {
            state.post.likes = action.payload.likes;
        },

        addCommentToPost(state, action) {
            state.post.comments.push(action.payload);
        },

        updateCommentPost(state, action) {

            state.post.comments = state.post.comments.map(commment =>
                commment._id === action.payload._id ? action.payload : commment
            )
        },

        deleteCommentFromPost(state, action) {

            const comment = state.post.comments.find(c => c._id === action.payload);

            const commentIndex = state.post.comments.indexOf(comment);

            state.post.comments.splice(commentIndex, 1);

        },

        clearIsPostCreated(state) {
            state.isPostCreated = false;
        },

        setLoading(state) {
            state.loading = true;
        },
        clearLoading(state) {
            state.loading = false;
        }

    }
});

const postReducer = postSlice.reducer;
const postActions = postSlice.actions;
export { postActions, postReducer }