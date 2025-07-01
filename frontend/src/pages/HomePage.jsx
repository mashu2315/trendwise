import { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleCard from '../components/ArticleCard';
import SearchBar from '../components/SearchBar';
import {RotateLoader} from "react-spinners"

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        console.log("SearchQuery",searchQuery)
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/articles${searchQuery ? `?q=${searchQuery}` : ''}`
        );
        console.log("response",response);
        
        setArticles(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, [searchQuery]);

  return (
    <div className="container mx-auto p-4">
      
      <SearchBar onSearch={setSearchQuery} />
     {
      loading? <div className='text-center flex items-center justify-center h-screen'> <RotateLoader /></div> :  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
     }
    </div>
  );
};

export default HomePage;


