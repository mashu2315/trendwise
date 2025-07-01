

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Header from './components/Header';
function App() {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <div className="min-h-screen bg-gray-300">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/article/:slug"
            element={

              <ArticlePage />

            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          {user && <Route path="/admin" element={<AdminPage />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;



