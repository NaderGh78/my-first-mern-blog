import { postActions } from "../slices/postSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

/*===========================================*/
/*===========================================*/
/*===========================================*/

// Get All Posts (admin only)
export function getAllPostsForAdmin() {

    return async (dispatch) => {

        try {

            // get all posts for admin dashbord WITHOUUUUUUT [page number provided]
            const { data } = await request.get(`/api/post`);

            dispatch(postActions.setPosts(data));

        } catch (error) {

            toast.error(error.response.data.message);

        }

    }
}

/*===========================================*/

// Get All Posts Based On Page Number
export function getAllPosts(pageNumber) {

    return async (dispatch) => {

        try {

            // run the loader
            dispatch(postActions.setLoading());

            // get all posts based on [page number provided]
            const { data } = await request.get(`/api/post?pageNumber=${pageNumber}`);

            dispatch(postActions.setPosts(data));

            // remove the loader
            dispatch(postActions.clearLoading());

        } catch (error) {

            dispatch(postActions.clearLoading());

        }

    }
}

/*===========================================*/

// Fetch Posts Based On Category
export function fetchPostsBasedOnCategory(category) {

    return async (dispatch) => {

        try {

            dispatch(postActions.setLoading());

            // get all posts based on [category provided]
            const { data } = await request.get(`/api/post?category=${category}`);

            dispatch(postActions.setPostsCate(data));

            dispatch(postActions.clearLoading());

        } catch (error) {

            toast.error(error.response.data.message);

        }

    }
}

/*===========================================*/

// Get Single Post  
export function getSinglePost(postId) {

    return async (dispatch) => {

        try {

            dispatch(postActions.setLoading());

            // get single post based on post id provided
            const { data } = await request.get(`/api/post/${postId}`);

            dispatch(postActions.setPost(data));

            dispatch(postActions.clearLoading());

        } catch (error) {

            console.log(error.response.data.message);

        }

    }
}

/*===========================================*/

// Create Post
export function createPost(newPost) {

    return async (dispatch, getState) => {

        try {

            // run the loader
            dispatch(postActions.setIsPostCreated());

            /*
            create a new post based on 
            [post content + token for logged user or admin + formdata for upload post img]
            */
            const { data } = await request.post(`/api/post`, newPost,
                {
                    headers: {
                        Authorization: "Bearer " + getState().auth.user.token,
                        "Content-Type": "multipart/form-data",
                    },
                });

            console.log(data)

            dispatch(postActions.setPosts(data));

            // remove the loader
            dispatch(postActions.clearIsPostCreated());

            // show success toast in case new post added succefully
            toast.success(data.message, {
                position: toast.POSITION.TOP_RIGHT
            });

        } catch (error) {


            toast.error(error?.response?.data?.message);

            dispatch(postActions.clearIsPostCreated());

        }

    }
}

/*===========================================*/

// Update Post
export function updatePost(editPost, postId) {

    return async (dispatch, getState) => {

        try {

            // run the loader
            dispatch(postActions.setIsPostEdited());

            /*
            update a new post based on 
            [post content + token for logged user or admin + formdata for upload post img]
            */
            const { data } = await request.put(`/api/post/${postId}`, editPost,
                {
                    headers: {
                        Authorization: "Bearer " + getState().auth.user.token,
                        "Content-Type": "multipart/form-data",
                    }
                },

            );

            dispatch(postActions.setPost(data));

            dispatch(postActions.clearIsPostEdited());


            //show success toast in case update post succefully
            toast.success("Post Updated Successfully,Please Go Home", {
                position: toast.POSITION.TOP_RIGHT
            });

        } catch (error) {

            toast.error(error.response.data.message);

            dispatch(postActions.clearIsPostEdited());

        }

    }
}

/*===========================================*/

// Delete Post
export function deletePost(postId) {

    return async (dispatch, getState) => {

        try {

            /*
             delete a post based on [provided post id + token for logged user or admin],
             cos ONLY the [logged user or admin] can [add or update or delete] post
            */
            const { data } = await request.delete(`/api/post/${postId}`,
                {
                    headers: {
                        Authorization: "Bearer " + getState().auth.user.token,
                    }
                }

            );

            // show success toast in case post deleted succefully
            toast.success(data.message, {
                position: toast.POSITION.TOP_RIGHT
            });

            dispatch(postActions.setDeletePost(data.postId));

            // when deleted post succefully
            dispatch(postActions.setIsPostDelete());

            // back the isPostDelete to initial value after 2 milsecond
            setTimeout(() => dispatch(postActions.clearIsPostDelete()), 2);

            console.log(data)

        } catch (error) {
            console.log(error)
        }

    }
}

/*===========================================*/

// Get Posts Count 
export function getPostsCount() {

    return async (dispatch) => {

        try {

            // get posts count
            const { data } = await request.get(`/api/post/count`);

            dispatch(postActions.setPostsCount(data));

        } catch (error) {

            toast.error(error.response?.data?.message);

        }

    }
}

/*===========================================*/

// Toggle Like Post
export function toggleLikePost(postId) {

    return async (dispatch, getState) => {

        try {

            // toggle likes on post based on [post id provided + token for user or admin]
            const { data } = await request.put(`/api/post/like/${postId}`, {},
                {
                    headers: {
                        Authorization: "Bearer " + getState().auth.user.token,
                    }
                });

            dispatch(postActions.setLike(data));

        } catch (error) {

            toast.error(error.response.data.message);

        }

    }
}  