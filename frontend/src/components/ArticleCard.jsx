import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  return (
    <div className="border p-4 mt-8 mx-2 transition-all duration-200 rounded-xl shadow bg-[#52595e] hover:scale-105 hover:shadow-lg hover:shadow-white">
      {article.media[0] && (
        <img src={article.media[0]} alt={article.title} className="w-full h-48 object-cover mb-2" />
      )}
      <h2 className="text-xl font-semibold text-[#b8b8a7]">{article.title}</h2>
      <p className="text-[#E0E0E0]">{article.content.substring(0, 100)}...</p>
      <Link to={`/article/${article.slug}`} className="text-blue-500 hover:scale-105 hover:text-gray-100 px-2 rounded-full">Read More</Link>
    </div>
  );
};

export default ArticleCard;