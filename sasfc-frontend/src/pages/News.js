import { NewsCard } from '../components/common/NewsCard';
import { useEffect, useState } from 'react';
import { getLatestNews } from '../services/newsService';

export const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getLatestNews();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Club News</h1>
      
      {loading ? (
        <div className="text-center py-8">Loading news...</div>
      ) : news.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map(item => (
            <NewsCard key={item.id} newsItem={item} />
          ))}
        </div>
      ) : (
        <p className="text-center py-8">No news articles available</p>
      )}
    </div>
  );
};