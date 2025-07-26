import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNewsItem } from '../services/newsService';

export const NewsDetail = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNewsItem(id);
        setNewsItem(data);
      } catch (err) {
        console.error('Error fetching news item:', err);
        setError('Failed to load news article.');
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Loading news article...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  if (!newsItem) {
    return <div className="text-center py-8">News article not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <img 
        src={newsItem.image} 
        alt={newsItem.title} 
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <h1 className="text-4xl font-bold mb-4">{newsItem.title}</h1>
      <div className="flex items-center text-gray-600 text-sm mb-6">
        <span className="mr-4">{new Date(newsItem.date).toLocaleDateString()}</span>
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
          {newsItem.category}
        </span>
      </div>
      <div 
        className="prose prose-lg max-w-none" 
        dangerouslySetInnerHTML={{ __html: newsItem.content }} 
      />
    </div>
  );
};
