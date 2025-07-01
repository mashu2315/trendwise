import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const CommentSection = ({ articleId }) => {
  const [user] = useAuthState(auth);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/comments/${articleId}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [articleId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert('Please log in to comment');
    try {
      const token = await user.getIdToken();
      console.log("Ye h content",content)
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/comments`,
        { articleId, content },
        { headers: { Authorization: `${token}` } }
      );
      setContent('');

    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      {user ? (
        <form onSubmit={handleSubmit} className="mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Write a comment..."
          ></textarea>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Post Comment
          </button>
        </form>
      ) : (
        <p>Please <a href="/login" className="text-blue-500">log in</a> to comment.</p>
      )}
      <div>
        {comments.map((comment) => (
          <div key={comment._id} className="border-b py-2">
            <p className="font-semibold">{comment.userName}</p>
            <p>{comment.content}</p>
            <p className="text-gray-500 text-sm">{new Date(comment.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;