import React from 'react';
import useAppState from './useAppState';

// Pages
import Navigation from './pages/Navigation';
import HomePage from './pages/MainHomepage';
import ArtworkListingPage from './pages/ArtworkListingPage';
import ArtworkDetailPage from './pages/ArtworkDetailPage';
import ArtistDashboard from './pages/ArtistDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import AdminPanel from './pages/AdminPanel';
import { AnalyticsPage, LoginPage } from './pages/AnalyticsPage';

function App() {
  const app = useAppState();

  const renderPage = () => {
    switch (app.currentPage) {
      case 'home':
        return <HomePage artworks={app.artworks} setCurrentPage={app.setCurrentPage} setSelectedArtwork={app.setSelectedArtwork} />;
      case 'artworks':
        return (
          <ArtworkListingPage
            filteredArtworks={app.filteredArtworks}
            searchTerm={app.searchTerm}
            filterCategory={app.filterCategory}
            filterPrice={app.filterPrice}
            handleSearch={app.setSearchTerm}
            handleCategoryFilter={app.setFilterCategory}
            handlePriceFilter={app.setFilterPrice}
            setSelectedArtwork={app.setSelectedArtwork}
            setCurrentPage={app.setCurrentPage}
          />
        );
      case 'artwork-detail':
        return (
          <ArtworkDetailPage
            selectedArtwork={app.selectedArtwork}
            setCurrentPage={app.setCurrentPage}
            isLoggedIn={app.isLoggedIn}
            userRole={app.userRole}
            bidAmount={app.bidAmount}
            setBidAmount={app.setBidAmount}
            handlePlaceBid={app.handlePlaceBid}
            bidHistory={app.bidHistory}
          />
        );
      case 'artist-dashboard':
        return (
          <ArtistDashboard
            newArtwork={app.newArtwork}
            setNewArtwork={app.setNewArtwork}
            handleAddArtwork={app.handleAddArtwork}
            userArtworks={app.artworks.filter((a) => a.artist === 'You')}
            handleDeleteArtwork={app.handleDeleteArtwork}
          />
        );
      case 'buyer-dashboard':
        return <BuyerDashboard userBids={app.userBids} />;
      case 'admin-panel':
        return (
          <AdminPanel
            pendingArtworks={app.pendingArtworks}
            setPendingArtworks={app.setPendingArtworks}
            handleApproveArtwork={app.handleApproveArtwork}
            users={app.users}
            handleDeleteUser={app.handleDeleteUser}
          />
        );
      case 'analytics':
        return <AnalyticsPage />;
      case 'login':
        return <LoginPage handleLogin={app.handleLogin} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navigation
        currentPage={app.currentPage}
        setCurrentPage={app.setCurrentPage}
        isLoggedIn={app.isLoggedIn}
        userRole={app.userRole}
        handleLogout={app.handleLogout}
        mobileMenuOpen={app.mobileMenuOpen}
        setMobileMenuOpen={app.setMobileMenuOpen}
      />
      {renderPage()}
    </div>
  );
}

export default App;
