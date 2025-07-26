import { useEffect, useState } from 'react';
import { NewsCard } from '../common/NewsCard';
import { getLatestNews } from '../../services/newsService';

export const LatestNews = () => {
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
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Latest News</h2>
        
        {loading ? (
          <div className="text-center">Loading news...</div>
        ) : news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map(item => (
              <NewsCard 
                key={item.id} 
                newsItem={item} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center">No news available</div>
        )}
        
        <div className="text-center mt-8">
          <a 
            href="/news" 
            className="inline-block bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            View All News
          </a>
        </div>
      </div>
    </section>
  );
};