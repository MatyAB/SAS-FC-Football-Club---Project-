import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { useEffect } from 'react';

// Public Components
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Team } from './pages/Team';
import { Matches } from './pages/Matches';
import { MatchDetail } from './pages/MatchDetail';
import { News } from './pages/News';
import { NewsDetail } from './pages/NewsDetail';
import { Gallery } from './pages/Gallery';
import { GalleryDetails } from './pages/GalleryDetails';
import { Contact } from './pages/Contact';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { PlayerDetail } from './pages/PlayerDetail';

// Admin Components
import AdminLayout from './components/layout/AdminLayout';
import { Login } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';
import { PlayersAdmin } from './pages/admin/PlayersAdmin';
import { MatchesAdmin } from './pages/admin/MatchesAdmin';
import { NewsAdmin } from './pages/admin/NewsAdmin';
import { MatchForm } from './pages/admin/MatchForm';
import { NewsForm } from './pages/admin/NewsForm';
import { PlayerForm } from './pages/admin/PlayerForm';
import UsersAdmin from './pages/admin/UsersAdmin';
import RolesAdmin from './pages/admin/RolesAdmin';
import { TeamsAdmin } from './pages/admin/TeamsAdmin';
import { TeamsForm } from './pages/admin/TeamsForm';
import { GalleryAdmin } from './pages/admin/GalleryAdmin';
import { GalleryForm } from './pages/admin/GalleryForm';
import { GalleryEdit } from './pages/admin/GalleryEdit';
import { SponsorsAdmin } from './pages/admin/SponsorsAdmin';
import { SponsorForm } from './pages/admin/SponsorForm';

function AppWrapper() {
  return (
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  );
}

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Show Navbar only on non-admin routes */}
      {!isAdminRoute && <Navbar />}

      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/players/:id" element={<PlayerDetail />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/matches/:id" element={<MatchDetail />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:id" element={<GalleryDetails />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Auth */}
          <Route path="/admin/login" element={<Login />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly={true}><AdminLayout><Dashboard /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/players" element={<ProtectedRoute adminOnly={true}><AdminLayout><PlayersAdmin /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/players/new" element={<ProtectedRoute adminOnly={true}><AdminLayout><PlayerForm /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/players/edit/:id" element={<ProtectedRoute adminOnly={true}><AdminLayout><PlayerForm /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/matches" element={<ProtectedRoute adminOnly={true}><AdminLayout><MatchesAdmin /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/matches/new" element={<ProtectedRoute adminOnly={true}><AdminLayout><MatchForm /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/matches/edit/:id" element={<ProtectedRoute adminOnly={true}><AdminLayout><MatchForm /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/news" element={<ProtectedRoute adminOnly={true}><AdminLayout><NewsAdmin /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/news/new" element={<ProtectedRoute adminOnly={true}><AdminLayout><NewsForm /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/news/edit/:id" element={<ProtectedRoute adminOnly={true}><AdminLayout><NewsForm /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute adminOnly={true}><AdminLayout><UsersAdmin /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/roles" element={<ProtectedRoute adminOnly={true}><AdminLayout><RolesAdmin /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/teams" element={<ProtectedRoute adminOnly={true}><AdminLayout><TeamsAdmin /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/teams/new" element={<ProtectedRoute adminOnly={true}><AdminLayout><TeamsForm /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/teams/edit/:id" element={<ProtectedRoute adminOnly={true}><AdminLayout><TeamsForm /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/gallery" element={<ProtectedRoute adminOnly={true}><AdminLayout><GalleryAdmin /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/gallery/new" element={<ProtectedRoute adminOnly={true}><AdminLayout><GalleryForm /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/gallery/edit/:id" element={<ProtectedRoute adminOnly={true}><AdminLayout><GalleryEdit /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/sponsors" element={<ProtectedRoute adminOnly={true}><AdminLayout><SponsorsAdmin /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/sponsors/new" element={<ProtectedRoute adminOnly={true}><AdminLayout><SponsorForm /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/sponsors/edit/:id" element={<ProtectedRoute adminOnly={true}><AdminLayout><SponsorForm /></AdminLayout></ProtectedRoute>} />

          {/* 404 Page */}
          <Route path="*" element={<div className="text-center py-20">Page Not Found</div>} />
        </Routes>
      </main>

      {/* Show Footer only on non-admin routes */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default AppWrapper;
