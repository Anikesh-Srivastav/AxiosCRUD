import axios from 'axios';

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});


//get post
export const getPost = () => {
    return api.get("/posts");
};

//delete post

 export const deletePost = (id) => {
    return api.delete(`posts/${id}`)
 };

 export const postData = (post) => {
    return api.post('/posts',post)
 };

 // update post
export const updatePost = (id, updatedPost) => {
    return api.put(`/posts/${id}`, updatedPost);
};