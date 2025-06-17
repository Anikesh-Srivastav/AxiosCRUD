import React, { useState, useEffect } from 'react';
import { postData } from '../api/Services';

const Form = ({ data, setData, isEditing, editPost, setIsEditing }) => {
  const [input, setInput] = useState({ title: '', body: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && editPost) {
      setInput({ title: editPost.title, body: editPost.body });
    }
  }, [isEditing, editPost]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!input.title.trim() || !input.body.trim()) {
      alert("Please fill out both title and body.");
      return;
    }

    if (isEditing) {
      const updatedData = data.map((post) =>
        post.id === editPost.id ? { ...post, ...input } : post
      );
      setData(updatedData);
      setIsEditing(false);
      setInput({ title: '', body: '' });
      return;
    }


    setLoading(true);
    try {
      const res = await postData(input);
      const uniqueId = Date.now() + Math.random();

      const newPost = {
        ...input,
        id: res.data.id === 101 ? uniqueId : res.data.id,
      };

      if (res.status === 201) {
        setData((prev) => [...prev, newPost]);
        setInput({ title: '', body: '' });
      }
    } catch (err) {
      console.error("Error adding post", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="title"></label>
        <input
          type="text"
          autoComplete="off"
          id="title"
          name="title"
          placeholder="Add title"
          value={input.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="body"></label>
        <input
          type="text"
          autoComplete="off"
          id="body"
          name="body"
          placeholder="Add body"
          value={input.body}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : isEditing ? 'Update' : 'Add'}
      </button>
    </form>
  );
};

export default Form;
