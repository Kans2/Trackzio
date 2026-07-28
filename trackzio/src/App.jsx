import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppProvider';
import Navbar from './components/layout/Navbar';
import Marketplace from './pages/Marketplace';
import CommunityFeed from './pages/CommunityFeed';
import MyCollection from './pages/MyCollection';
import Profile from './pages/Profile';
import GlobalSnackbar from './components/ui/GlobalSnackbar';

function App() {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Marketplace />} />
          <Route path="/community" element={<CommunityFeed />} />
          <Route path="/collection" element={<MyCollection />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        {/* Global toast notifications — rendered once, reads from context */}
        <GlobalSnackbar />
      </Router>
    </AppProvider>
  );
}

export default App;
