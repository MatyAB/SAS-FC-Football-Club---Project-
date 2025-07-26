import { format } from 'date-fns';

export const NewsCard = ({ newsItem }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <img 
        src={newsItem.image} 
        alt={newsItem.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">
            {format(new Date(newsItem.date), 'MMMM d, yyyy')}
          </span>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
            {newsItem.category}
          </span>
        </div>
        <h3 className="font-bold text-lg mb-2">{newsItem.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{newsItem.excerpt}</p>
        <a 
          href={`/news/${newsItem.id}`} 
          className="text-sas-green-700 hover:text-sas-green-900 font-medium"
        >
          Read More
        </a>
      </div>
    </div>
  );
};
