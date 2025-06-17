import React, { useEffect, useState } from 'react';
import { deletePost, getPost } from '../api/Services';
import '../app.css';
import Form from './Form';

const PostCards = () => {
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editPost, setEditPost] = useState(null);

  const getPostData = async () => {
    try {
      const res = await getPost();
      setData(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  const handleDeletePost = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        const updatedPostList = data.filter((post) => post.id !== id);
        setData(updatedPostList);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEditPost = (post) => {
    setEditPost(post);
    setIsEditing(true);
  };

  return (
    <>
      <section className="section-form">
        <Form
          data={data}
          setData={setData}
          isEditing={isEditing}
          editPost={editPost}
          setIsEditing={setIsEditing}
        />
      </section>

      <section className="section-post">
        <ol>
          {data.map((currentPost) => {
            const { id, title, body } = currentPost;
            return (
              <li key={id}>
                <p>Title: {title}</p>
                <p>Message: {body}</p>
                <button onClick={() => handleEditPost(currentPost)}>Edit</button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeletePost(id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
};

export default PostCards;
