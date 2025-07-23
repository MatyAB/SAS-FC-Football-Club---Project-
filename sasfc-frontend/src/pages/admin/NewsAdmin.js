import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getNews, deleteNews } from '../../services/newsService';
import { format } from 'date-fns';

export const NewsAdmin = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this news article?')) {
      try {
        await deleteNews(id);
        setNews(news.filter(item => item.id !== id));
      } catch (error) {
        console.error('Error deleting news:', error);
      }
    }
  };

  if (loading) return <div className="text-center py-8">Loading news...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Manage News</h1>
        <Link
          to="/admin/news/new"
          className="bg-sas-green-700 hover:bg-sas-green-800 text-white px-4 py-2 rounded"
        >
          Add New Article
        </Link>
      </div>

      <div className="space-y-4">
        {news.length === 0 ? (
          <p className="text-center py-8">No news articles found</p>
        ) : (
          news.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {format(new Date(item.date), 'MMMM d, yyyy')} • {item.category}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/admin/news/edit/${item.id}`}
                      className="text-sas-green-700 hover:text-sas-green-900 px-3 py-1 rounded border border-sas-green-700"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-800 px-3 py-1 rounded border border-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-gray-700 line-clamp-2">{item.excerpt}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
