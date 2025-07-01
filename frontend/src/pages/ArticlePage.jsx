import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentSection from '../components/CommentSection';

const ArticlePage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        
        console.log("VITE:",import.meta.env.VITE_API_URL)
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/articles/${slug}`);
        setArticle(response.data);
        console.log("Article: ",response);
      }

 catch (error) {
      console.error('Error fetching article:', error);
    }
  };
  fetchArticle();
}, [slug]);

  if (!article) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
     
        <title>{article.meta.ogTitle}</title>
        <meta name="description" content={article.meta.description} />
        <meta property="og:title" content={article.meta.ogTitle} />
        <meta property="og:image" content={article.meta.ogImage} />
      
      <h1 className="text-3xl text-[#FEF3C7] font-bold mb-4">{article.title}</h1>
      <div className="text-black " dangerouslySetInnerHTML={{ __html: article.content }} />
      {article.media.map((media, index) => (
        <div key={index}>
          {media.includes('youtube') ? (
            <iframe src={media} className="w-full h-64 my-2" />
          ) : (
            <img src={media} alt="Media" className="w-full my-2" />
          )}
        </div>
      ))}
      <CommentSection articleId={article._id} />
    </div>
  );
};

export default ArticlePage;

