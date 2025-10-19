import React, { useState } from 'react';
import { Home, Palette, ShoppingCart, BarChart3, Users, LogOut, Menu, X, Plus, Trash2, Edit2, Eye, TrendingUp } from 'lucide-react';

export default function ArtAuctionPlatform() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mock Data State
  const [artworks, setArtworks] = useState([
    { id: 1, title: 'Modern Abstraction', artist: 'John Doe', category: 'Abstract', basePrice: 150000, currentBid: 250000, bids: 12, timeLeft: '2h 45m', status: 'live', image: '🎨', artistId: 'artist1' },
    { id: 2, title: 'Sunset Landscapes', artist: 'Jane Smith', category: 'Landscape', basePrice: 120000, currentBid: 185000, bids: 8, timeLeft: '5h 20m', status: 'live', image: '🌅', artistId: 'artist2' },
    { id: 3, title: 'Digital Dreams', artist: 'Alex Tech', category: 'Digital', basePrice: 200000, currentBid: 315000, bids: 15, timeLeft: '1h 15m', status: 'live', image: '🖼️', artistId: 'artist3' },
  ]);

  const [userArtworks, setUserArtworks] = useState([]);
  const [userBids, setUserBids] = useState([]);
  const [newArtwork, setNewArtwork] = useState({ title: '', category: '', basePrice: '', description: '' });
  const [filteredArtworks, setFilteredArtworks] = useState(artworks);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidHistory, setBidHistory] = useState([]);

  // Users data
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@art.com', role: 'Artist', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@art.com', role: 'Buyer', status: 'Active' },
    { id: 3, name: 'Alex Tech', email: 'alex@art.com', role: 'Artist', status: 'Active' },
  ]);

  const [pendingArtworks, setPendingArtworks] = useState([
    { id: 101, title: 'New Contemporary', artist: 'Bob Artist', status: 'Pending' },
  ]);

  // Login Handler
  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setCurrentPage('home');
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setCurrentPage('home');
    setUserArtworks([]);
    setUserBids([]);
  };

  // Artwork Management
  const handleAddArtwork = () => {
    if (newArtwork.title && newArtwork.category && newArtwork.basePrice) {
      const artwork = {
        id: artworks.length + 1,
        ...newArtwork,
        basePrice: parseInt(newArtwork.basePrice),
        currentBid: parseInt(newArtwork.basePrice),
        bids: 0,
        timeLeft: '7d',
        status: 'pending',
        image: '🎨',
        artistId: 'current-artist'
      };
      setUserArtworks([...userArtworks, artwork]);
      setNewArtwork({ title: '', category: '', basePrice: '', description: '' });
      alert('Artwork added successfully!');
    }
  };

  const handleDeleteArtwork = (id) => {
    setUserArtworks(userArtworks.filter(art => art.id !== id));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterArtworks(term, filterCategory, filterPrice);
  };

  const handleCategoryFilter = (category) => {
    setFilterCategory(category);
    filterArtworks(searchTerm, category, filterPrice);
  };

  const handlePriceFilter = (price) => {
    setFilterPrice(price);
    filterArtworks(searchTerm, filterCategory, price);
  };

  const filterArtworks = (search, category, price) => {
    let filtered = artworks;

    if (search) {
      filtered = filtered.filter(art =>
        art.title.toLowerCase().includes(search.toLowerCase()) ||
        art.artist.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== 'all') {
      filtered = filtered.filter(art => art.category === category);
    }

    if (price !== 'all') {
      if (price === 'low') filtered = filtered.filter(art => art.currentBid < 200000);
      if (price === 'mid') filtered = filtered.filter(art => art.currentBid >= 200000 && art.currentBid < 300000);
      if (price === 'high') filtered = filtered.filter(art => art.currentBid >= 300000);
    }

    setFilteredArtworks(filtered);
  };

  const handlePlaceBid = () => {
    if (selectedArtwork && bidAmount && parseInt(bidAmount) > selectedArtwork.currentBid) {
      const newBid = {
        artwork: selectedArtwork.title,
        bidAmount: parseInt(bidAmount),
        time: new Date().toLocaleTimeString()
      };
      setBidHistory([...bidHistory, newBid]);
      setUserBids([...userBids, { ...selectedArtwork, userBid: bidAmount }]);
      alert(`Bid placed successfully for ₹${bidAmount}!`);
      setBidAmount('');
    } else {
      alert('Please enter a valid bid amount higher than current bid!');
    }
  };

  const handleApproveArtwork = (id) => {
    setPendingArtworks(pendingArtworks.filter(art => art.id !== id));
    alert('Artwork approved!');
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  // Navigation Component
  const Navigation = () => (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-amber-500/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <Palette className="text-amber-500 text-2xl" size={28} />
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">ArtVault</span>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex space-x-1 ${mobileMenuOpen ? 'block' : ''}`}>
            <button onClick={() => setCurrentPage('home')} className="px-4 py-2 rounded-lg hover:bg-amber-500/20 transition-all duration-300 flex items-center gap-2">
              <Home size={18} /> Home
            </button>
            <button onClick={() => setCurrentPage('artworks')} className="px-4 py-2 rounded-lg hover:bg-amber-500/20 transition-all duration-300 flex items-center gap-2">
              <Palette size={18} /> Artworks
            </button>
            {isLoggedIn && userRole === 'Artist' && (
              <button onClick={() => setCurrentPage('artist-dashboard')} className="px-4 py-2 rounded-lg hover:bg-amber-500/20 transition-all duration-300 flex items-center gap-2">
                <ShoppingCart size={18} /> Dashboard
              </button>
            )}
            {isLoggedIn && userRole === 'Buyer' && (
              <button onClick={() => setCurrentPage('buyer-dashboard')} className="px-4 py-2 rounded-lg hover:bg-amber-500/20 transition-all duration-300 flex items-center gap-2">
                <ShoppingCart size={18} /> My Bids
              </button>
            )}
            {isLoggedIn && userRole === 'Admin' && (
              <button onClick={() => setCurrentPage('admin-panel')} className="px-4 py-2 rounded-lg hover:bg-amber-500/20 transition-all duration-300 flex items-center gap-2">
                <Users size={18} /> Admin
              </button>
            )}
            {isLoggedIn && (
              <button onClick={() => setCurrentPage('analytics')} className="px-4 py-2 rounded-lg hover:bg-amber-500/20 transition-all duration-300 flex items-center gap-2">
                <BarChart3 size={18} /> Analytics
              </button>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-3">
            {!isLoggedIn ? (
              <>
                <button onClick={() => setCurrentPage('login')} className="px-4 py-2 rounded-lg border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-gray-900 transition-all duration-300 font-semibold">Login</button>
              </>
            ) : (
              <button onClick={handleLogout} className="px-4 py-2 rounded-lg border border-red-500 text-red-400 hover:bg-red-500 hover:text-gray-900 transition-all duration-300 font-semibold flex items-center gap-2">
                <LogOut size={18} /> Logout
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && !isLoggedIn && (
          <div className="md:hidden pb-4 space-y-2">
            <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-amber-500/20">Home</button>
            <button onClick={() => { setCurrentPage('artworks'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-amber-500/20">Artworks</button>
            <button onClick={() => { setCurrentPage('login'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 rounded-lg border border-amber-500 text-amber-400">Login</button>
          </div>
        )}
      </div>
    </nav>
  );

  // Home Page
  const HomePage = () => (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-850 to-gray-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,119,6,0.3),rgba(217,119,6,0))]"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">Discover Authentic Art</h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">Participate in live auctions, bid on exceptional artworks, and support emerging artists worldwide</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setCurrentPage('artworks')} className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 rounded-lg font-bold hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300">Explore Auctions</button>
            <button onClick={() => setCurrentPage('login')} className="px-8 py-3 border-2 border-amber-500 text-amber-400 rounded-lg font-bold hover:bg-amber-500/10 transition-all duration-300">Get Started</button>
          </div>
        </div>

        {/* Ongoing Auctions */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Ongoing Auctions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artworks.map(artwork => (
              <div key={artwork.id} className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20">
                <div className="relative h-48 bg-gradient-to-br from-purple-600 to-blue-600 overflow-hidden flex items-center justify-center text-6xl">
                  {artwork.image}
                  <div className="absolute top-3 right-3 bg-red-600 px-3 py-1 rounded-full text-sm font-bold">LIVE</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-amber-400 transition-colors">{artwork.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">by {artwork.artist}</p>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Current Bid:</span>
                      <span className="text-amber-400 font-bold">₹{artwork.currentBid.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Bids:</span>
                      <span className="text-white font-bold">{artwork.bids}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Time Left:</span>
                      <span className="text-orange-400 font-bold">{artwork.timeLeft}</span>
                    </div>
                  </div>
                  <button onClick={() => { setSelectedArtwork(artwork); setCurrentPage('artwork-detail'); }} className="w-full py-2 bg-amber-500 text-gray-900 rounded-lg font-bold hover:bg-amber-600 transition-colors">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🔨', title: 'Live Bidding', desc: 'Real-time auction bidding with instant updates' },
              { icon: '🎨', title: 'Artist Portal', desc: 'Upload artworks and manage listings easily' },
              { icon: '📊', title: 'Analytics', desc: 'Comprehensive reports and insights' },
              { icon: '🔍', title: 'Smart Search', desc: 'Filter by category, artist, and price' },
              { icon: '🔒', title: 'Secure', desc: 'JWT authentication and encrypted transactions' },
              { icon: '📱', title: 'Mobile Ready', desc: 'Fully responsive design for all devices' }
            ].map((feature, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-amber-500/50 transition-all group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  // Artwork Listing Page
  const ArtworkListingPage = () => (
    <section className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">Artwork Listings</h1>

        {/* Filters */}
        <div className="bg-gray-800 p-6 rounded-2xl mb-8 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="Search by title or artist..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
            />
            <select
              value={filterCategory}
              onChange={(e) => handleCategoryFilter(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Categories</option>
              <option value="Abstract">Abstract</option>
              <option value="Landscape">Landscape</option>
              <option value="Digital">Digital</option>
              <option value="Portrait">Portrait</option>
            </select>
            <select
              value={filterPrice}
              onChange={(e) => handlePriceFilter(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Prices</option>
              <option value="low">Below ₹2 Lakh</option>
              <option value="mid">₹2-3 Lakh</option>
              <option value="high">Above ₹3 Lakh</option>
            </select>
          </div>
          <p className="text-gray-400">Found {filteredArtworks.length} artworks</p>
        </div>

        {/* Artworks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtworks.map(artwork => (
            <div key={artwork.id} className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-amber-500/50 transition-all hover:shadow-2xl hover:shadow-amber-500/20">
              <div className="relative h-48 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-5xl">
                {artwork.image}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{artwork.title}</h3>
                <p className="text-gray-400 text-sm mb-2">by {artwork.artist}</p>
                <p className="text-amber-400 text-xs mb-4">Category: {artwork.category}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Current Bid:</span>
                    <span className="text-amber-400 font-bold">₹{artwork.currentBid.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Base Price:</span>
                    <span className="text-white font-bold">₹{artwork.basePrice.toLocaleString()}</span>
                  </div>
                </div>
                <button onClick={() => { setSelectedArtwork(artwork); setCurrentPage('artwork-detail'); }} className="w-full py-2 bg-amber-500 text-gray-900 rounded-lg font-bold hover:bg-amber-600 transition-colors flex items-center justify-center gap-2">
                  <Eye size={18} /> View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Artwork Detail Page
  const ArtworkDetailPage = () => (
    <section className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => setCurrentPage('artworks')} className="mb-6 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">← Back</button>

        {selectedArtwork && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl h-96 flex items-center justify-center text-9xl border border-gray-700">
              {selectedArtwork.image}
            </div>

            {/* Details */}
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <h1 className="text-4xl font-bold mb-2">{selectedArtwork.title}</h1>
              <p className="text-xl text-gray-400 mb-4">by {selectedArtwork.artist}</p>
              <div className="bg-gray-700 p-6 rounded-lg mb-6">
                <p className="text-gray-400 text-sm">Current Bid</p>
                <p className="text-4xl font-bold text-amber-400">₹{selectedArtwork.currentBid.toLocaleString()}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Base Price</p>
                  <p className="text-xl font-bold">₹{selectedArtwork.basePrice.toLocaleString()}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Total Bids</p>
                  <p className="text-xl font-bold">{selectedArtwork.bids}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Category</p>
                  <p className="text-xl font-bold">{selectedArtwork.category}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Time Left</p>
                  <p className="text-xl font-bold text-orange-400">{selectedArtwork.timeLeft}</p>
                </div>
              </div>

              {/* Place Bid */}
              {isLoggedIn && userRole === 'Buyer' && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-4">Place Your Bid</h3>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder={`Minimum: ₹${(selectedArtwork.currentBid + 10000).toLocaleString()}`}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
                    />
                    <button onClick={handlePlaceBid} className="px-6 py-2 bg-amber-500 text-gray-900 rounded-lg font-bold hover:bg-amber-600 transition-colors">Place Bid</button>
                  </div>
                </div>
              )}

              {!isLoggedIn && (
                <button onClick={() => setCurrentPage('login')} className="w-full px-6 py-3 bg-amber-500 text-gray-900 rounded-lg font-bold hover:bg-amber-600 transition-colors mb-6">Login to Bid</button>
              )}

              {/* Bid History */}
              <div>
                <h3 className="text-xl font-bold mb-4">Bid History</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {bidHistory.filter(b => b.artwork === selectedArtwork.title).length > 0 ? (
                    bidHistory.filter(b => b.artwork === selectedArtwork.title).map((bid, idx) => (
                      <div key={idx} className="bg-gray-700 p-3 rounded-lg flex justify-between">
                        <span className="text-gray-400">{bid.time}</span>
                        <span className="font-bold text-amber-400">₹{bid.bidAmount.toLocaleString()}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400">No bids yet. Be the first to bid!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );

  // Artist Dashboard
  const ArtistDashboard = () => (
    <section className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">Artist Dashboard</h1>

        {/* Upload Form */}
        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold mb-6">Upload New Artwork</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Artwork Title"
              value={newArtwork.title}
              onChange={(e) => setNewArtwork({ ...newArtwork, title: e.target.value })}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
            />
            <select
              value={newArtwork.category}
              onChange={(e) => setNewArtwork({ ...newArtwork, category: e.target.value })}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
            >
              <option value="">Select Category</option>
              <option value="Abstract">Abstract</option>
              <option value="Landscape">Landscape</option>
              <option value="Digital">Digital</option>
              <option value="Portrait">Portrait</option>
            </select>
            <input
              type="number"
              placeholder="Base Price (₹)"
              value={newArtwork.basePrice}
              onChange={(e) => setNewArtwork({ ...newArtwork, basePrice: e.target.value })}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
            />
          </div>
          <textarea
            placeholder="Artwork Description"
            value={newArtwork.description}
            onChange={(e) => setNewArtwork({ ...newArtwork, description: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 mb-4 resize-none"
            rows="4"
          />
          <button onClick={handleAddArtwork} className="px-6 py-2 bg-amber-500 text-gray-900 rounded-lg font-bold hover:bg-amber-600 transition-colors flex items-center gap-2">
            <Plus size={18} /> Upload Artwork
          </button>
        </div>

        {/* Your Artworks */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Your Artworks</h2>
          {userArtworks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userArtworks.map((art) => (
                <div key={art.id} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-amber-500/50 transition-all">
                  <div className="text-6xl mb-4 text-center">{art.image}</div>
                  <h3 className="text-xl font-bold mb-2">{art.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">Category: {art.category}</p>
                  <p className="text-gray-400 text-sm mb-4">Base Price: ₹{art.basePrice.toLocaleString()}</p>
                  <p className="text-amber-400 font-semibold mb-4">Status: {art.status}</p>
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleDeleteArtwork(art.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">You haven’t uploaded any artworks yet.</p>
          )}
        </div>
      </div>
    </section>
  );

  // Buyer Dashboard
  const BuyerDashboard = () => (
    <section className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
          My Bids
        </h1>
        {userBids.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userBids.map((bid, idx) => (
              <div key={idx} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-amber-500/50 transition-all">
                <div className="text-6xl mb-4 text-center">{bid.image}</div>
                <h3 className="text-xl font-bold mb-2">{bid.title}</h3>
                <p className="text-gray-400 mb-2">Your Bid: ₹{parseInt(bid.userBid).toLocaleString()}</p>
                <p className="text-gray-400 mb-2">Current Highest: ₹{bid.currentBid.toLocaleString()}</p>
                <p className="text-amber-400 font-semibold">Status: {bid.status}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">You haven’t placed any bids yet.</p>
        )}
      </div>
    </section>
  );

  // Admin Panel
  const AdminPanel = () => (
    <section className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
          Admin Panel
        </h1>

        {/* Pending Artworks */}
        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 mb-10">
          <h2 className="text-2xl font-bold mb-4">Pending Artworks</h2>
          {pendingArtworks.length > 0 ? (
            pendingArtworks.map((art) => (
              <div key={art.id} className="flex justify-between items-center bg-gray-700 p-4 rounded-lg mb-3">
                <div>
                  <h3 className="font-semibold">{art.title}</h3>
                  <p className="text-gray-400 text-sm">by {art.artist}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApproveArtwork(art.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => setPendingArtworks(pendingArtworks.filter(a => a.id !== art.id))}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No pending artworks.</p>
          )}
        </div>

        {/* Manage Users */}
        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
          {users.length > 0 ? (
            <div className="space-y-3">
              {users.map((user) => (
                <div key={user.id} className="flex justify-between items-center bg-gray-700 p-4 rounded-lg">
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                    <p className="text-amber-400 text-sm">{user.role}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No users found.</p>
          )}
        </div>
      </div>
    </section>
  );

  // Analytics Page
  const AnalyticsPage = () => (
    <section className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
          Platform Analytics
        </h1>
        <div className="bg-gray-800 p-10 rounded-2xl border border-gray-700">
          <TrendingUp size={48} className="mx-auto text-amber-500 mb-4" />
          <p className="text-gray-400 text-lg mb-4">
            Track performance, bids, and engagement trends.
          </p>
          <p className="text-gray-500">(Analytics dashboard integration coming soon!)</p>
        </div>
      </div>
    </section>
  );

  // Login Page
  const LoginPage = () => (
    <section className="min-h-screen bg-gray-900 flex items-center justify-center py-12">
      <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
          Login as
        </h1>
        <div className="space-y-4">
          <button
            onClick={() => handleLogin('Buyer')}
            className="w-full py-3 bg-amber-500 text-gray-900 rounded-lg font-bold hover:bg-amber-600 transition-colors"
          >
            Buyer
          </button>
          <button
            onClick={() => handleLogin('Artist')}
            className="w-full py-3 bg-blue-500 text-gray-900 rounded-lg font-bold hover:bg-blue-600 transition-colors"
          >
            Artist
          </button>
          <button
            onClick={() => handleLogin('Admin')}
            className="w-full py-3 bg-green-500 text-gray-900 rounded-lg font-bold hover:bg-green-600 transition-colors"
          >
            Admin
          </button>
        </div>
      </div>
    </section>
  );

  // Page Router
  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'artworks': return <ArtworkListingPage />;
      case 'artwork-detail': return <ArtworkDetailPage />;
      case 'artist-dashboard': return <ArtistDashboard />;
      case 'buyer-dashboard': return <BuyerDashboard />;
      case 'admin-panel': return <AdminPanel />;
      case 'analytics': return <AnalyticsPage />;
      case 'login': return <LoginPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen text-white bg-gray-950">
      <Navigation />
      {renderPage()}
    </div>
  );
}
