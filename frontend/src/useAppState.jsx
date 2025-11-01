import { useState } from 'react';

const useAppState = () => {
    // Navigation + Auth
    const [currentPage, setCurrentPage] = useState('home');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Artwork + Bid Data
    const [artworks, setArtworks] = useState([
        { id: 1, title: 'Modern Abstraction', artist: 'John Doe', category: 'Abstract', basePrice: 150000, currentBid: 250000, bids: 12, timeLeft: '2h 45m', status: 'live', image: '🎨', artistId: 'artist1' },
        { id: 2, title: 'Sunset Dreams', artist: 'Jane Smith', category: 'Landscape', basePrice: 180000, currentBid: 270000, bids: 9, timeLeft: '3h 10m', status: 'live', image: '🌅', artistId: 'artist2' },
    ]);

    const [pendingArtworks, setPendingArtworks] = useState([]);
    const [bidHistory, setBidHistory] = useState([]);
    const [selectedArtwork, setSelectedArtwork] = useState(null);

    // Artist Data
    const [newArtwork, setNewArtwork] = useState({
        title: '',
        category: '',
        basePrice: '',
        description: '',
        image: null,
    });

    // Users (for admin)
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Artist' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Buyer' },
    ]);

    // Buyer Data
    const [userBids, setUserBids] = useState([]);
    const [bidAmount, setBidAmount] = useState('');

    // --- Handlers ---
    const handleLogin = (role) => {
        setIsLoggedIn(true);
        setUserRole(role);
        if (role === 'Admin') setCurrentPage('admin-panel');
        else if (role === 'Artist') setCurrentPage('artist-dashboard');
        else setCurrentPage('buyer-dashboard');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserRole(null);
        setCurrentPage('home');
    };

    const handleAddArtwork = () => {
        if (!newArtwork.title || !newArtwork.category || !newArtwork.basePrice) return;
        const artwork = {
            id: artworks.length + 1,
            ...newArtwork,
            artist: 'You',
            artistId: 'artist1',
            currentBid: parseInt(newArtwork.basePrice),
            bids: 0,
            timeLeft: '2h 30m',
            status: 'pending',
            image: '🖼️',
        };
        setPendingArtworks([...pendingArtworks, artwork]);
        setNewArtwork({ title: '', category: '', basePrice: '', description: '', image: null });
    };

    const handleApproveArtwork = (id) => {
        const approved = pendingArtworks.find((art) => art.id === id);
        setArtworks([...artworks, { ...approved, status: 'live' }]);
        setPendingArtworks(pendingArtworks.filter((a) => a.id !== id));
    };

    const handleDeleteArtwork = (id) => {
        setArtworks(artworks.filter((a) => a.id !== id));
    };

    const handleDeleteUser = (id) => {
        setUsers(users.filter((u) => u.id !== id));
    };

    const handlePlaceBid = () => {
        if (!bidAmount || !selectedArtwork) return;
        const minBid = selectedArtwork.currentBid + 10000;
        if (parseInt(bidAmount) < minBid) return alert(`Bid must be above ₹${minBid}`);

        const updatedArtwork = {
            ...selectedArtwork,
            currentBid: parseInt(bidAmount),
            bids: selectedArtwork.bids + 1,
        };

        setArtworks(artworks.map((a) => (a.id === selectedArtwork.id ? updatedArtwork : a)));
        setBidHistory([
            ...bidHistory,
            { artwork: selectedArtwork.title, bidAmount: parseInt(bidAmount), time: new Date().toLocaleTimeString() },
        ]);
        setUserBids([
            ...userBids,
            { ...updatedArtwork, userBid: bidAmount, status: 'Active' },
        ]);
        setBidAmount('');
    };

    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterPrice, setFilterPrice] = useState('all');

    const filteredArtworks = artworks.filter((art) => {
        const matchesSearch =
            art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            art.artist.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || art.category === filterCategory;
        const matchesPrice =
            filterPrice === 'all' ||
            (filterPrice === 'low' && art.currentBid < 200000) ||
            (filterPrice === 'mid' && art.currentBid >= 200000 && art.currentBid <= 300000) ||
            (filterPrice === 'high' && art.currentBid > 300000);
        return matchesSearch && matchesCategory && matchesPrice;
    });

    return {
        currentPage, setCurrentPage, isLoggedIn, userRole, mobileMenuOpen, setMobileMenuOpen,
        artworks, setArtworks, selectedArtwork, setSelectedArtwork,
        pendingArtworks, setPendingArtworks, users, handleDeleteUser,
        newArtwork, setNewArtwork, handleAddArtwork, handleApproveArtwork, handleDeleteArtwork,
        bidAmount, setBidAmount, handlePlaceBid, bidHistory, userBids,
        searchTerm, setSearchTerm, filterCategory, setFilterCategory, filterPrice, setFilterPrice,
        filteredArtworks, setIsLoggedIn, handleLogin, handleLogout
    };
};

export default useAppState;
