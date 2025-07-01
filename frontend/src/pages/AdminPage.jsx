import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const AdminPage = () => {
  const [user] = useAuthState(auth);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (!user) return;
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/articles`);
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, [user]);

  const triggerBot = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/articles`);
      alert('Article generation triggered');
      fetchArticles();
    } catch (error) {
      console.error('Error triggering bot:', error);
    }
  };

  if (!user) return <div>Please log in to access the admin panel.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <button
        onClick={triggerBot}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Trigger Content Bot
      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.map((article) => (
          <div key={article.slug} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="text-gray-600">{article.content.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;