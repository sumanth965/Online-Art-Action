import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useAppState from "./useAppState";

// Pages
import Navigation from "./pages/Navigation";
import HomePage from "./pages/MainHomepage";
import ArtworkListingPage from "./pages/ArtworkListingPage";
import ArtworkDetailPage from "./pages/ArtworkDetailPage";
import ArtistDashboard from "./pages/ArtistDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import AdminPanel from "./pages/AdminPanel";
import { AnalyticsPage, LoginPage } from "./pages/AnalyticsPage";

function App() {
  const app = useAppState();

  return (
    <Router>
      <div className="bg-gray-900 min-h-screen text-white">
        {/* ✅ Always show navigation */}
        <Navigation
          currentPage={app.currentPage}
          setCurrentPage={app.setCurrentPage}
          isLoggedIn={app.isLoggedIn}
          userRole={app.userRole}
          handleLogout={app.handleLogout}
          mobileMenuOpen={app.mobileMenuOpen}
          setMobileMenuOpen={app.setMobileMenuOpen}
        />

        {/* ✅ Define routes */}
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                artworks={app.artworks}
                setCurrentPage={app.setCurrentPage}
                setSelectedArtwork={app.setSelectedArtwork}
              />
            }
          />

          <Route
            path="/artworks"
            element={
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
            }
          />

          <Route
            path="/artwork/:id"
            element={
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
            }
          />

          <Route path="/artist-dashboard" element={<ArtistDashboard />} />
          <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/analytics" element={<AnalyticsPage />} />

          <Route
            path="/login"
            element={<LoginPage handleLogin={app.handleLogin} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


















