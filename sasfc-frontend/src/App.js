import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Public Components
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Team } from './pages/Team';
import { Matches } from './pages/Matches';
import { News } from './pages/News';
import { NewsDetail } from './pages/NewsDetail';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Admin Components
import AdminLayout from './components/layout/AdminLayout';
import { Login } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';
import { PlayersAdmin } from './pages/admin/PlayersAdmin';
import { MatchesAdmin } from './pages/admin/MatchesAdmin';
import { NewsAdmin } from './pages/admin/NewsAdmin';
import { NewsForm } from './pages/admin/NewsForm';
import UsersAdmin from './pages/admin/UsersAdmin';
import RolesAdmin from './pages/admin/RolesAdmin';

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Public Layout */}
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />

              {/* Admin Auth */}
              <Route path="/admin/login" element={<Login />} />

              {/* Admin Routes with Sidebar Layout */}
              <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly={true}><AdminLayout><Dashboard /></AdminLayout></ProtectedRoute>} />
              <Route path="/admin/players" element={<ProtectedRoute adminOnly={true}><AdminLayout><PlayersAdmin /></AdminLayout></ProtectedRoute>} />
              <Route path="/admin/matches" element={<ProtectedRoute adminOnly={true}><AdminLayout><MatchesAdmin /></AdminLayout></ProtectedRoute>} />
              <Route path="/admin/news" element={<ProtectedRoute adminOnly={true}><AdminLayout><NewsAdmin /></AdminLayout></ProtectedRoute>} />
              <Route path="/admin/news/new" element={<ProtectedRoute adminOnly={true}><AdminLayout><NewsForm /></AdminLayout></ProtectedRoute>} />
              <Route path="/admin/news/edit/:id" element={<ProtectedRoute adminOnly={true}><AdminLayout><NewsForm /></AdminLayout></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute adminOnly={true}><AdminLayout><UsersAdmin /></AdminLayout></ProtectedRoute>} />
              <Route path="/admin/roles" element={<ProtectedRoute adminOnly={true}><AdminLayout><RolesAdmin /></AdminLayout></ProtectedRoute>} />
              {/* 404 Page */}
              <Route path="*" element={<div className="text-center py-20">Page Not Found</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
