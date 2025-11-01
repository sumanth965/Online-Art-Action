import React, { useState } from 'react';
// This file contains all the state management and handlers
// Import all page components in your actual implementation

const useAppState = () => {
    // Navigation State
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
    const [newArtwork, setNewArtwork] = useState({ title: '', category: '', basePrice: '', description: '', image: '' });
    const [filteredArtworks, setFilteredArtworks] = useState(artworks);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterPrice, setFilterPrice] = useState('all');
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const [bidAmount, setBidAmount] = useState('');
    const [bidHistory, setBidHistory] = useState([]);

    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@art.com', role: 'Artist', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@art.com', role: 'Buyer', status: 'Active' },
        { id: 3, name: 'Alex Tech', email: 'alex@art.com', role: 'Artist', status: 'Active' },
    ]);

    const [pendingArtworks, setPendingArtworks] = useState([
        { id: 101, title: 'New Contemporary', artist: 'Bob Artist', status: 'Pending' },
    ]);

    // Handlers
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

    const handleAddArtwork = () => {
        if (newArtwork.title && newArtwork.category && newArtwork.basePrice && newArtwork.image) {
            const imageURL = URL.createObjectURL(newArtwork.image);
            const artwork = {
                id: artworks.length + 1,
                ...newArtwork,
                basePrice: parseInt(newArtwork.basePrice),
                currentBid: parseInt(newArtwork.basePrice),
                bids: 0,
                timeLeft: '7d',
                status: 'pending',
                image: imageURL,
                artistId: 'current-artist',
            };
            setUserArtworks([...userArtworks, artwork]);
            setNewArtwork({ image: '', title: '', category: '', basePrice: '', description: '' });
            alert('Artwork added successfully!');
        } else {
            alert('Please fill in all fields including image!');
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

    return {
        // State
        currentPage, setCurrentPage,
        isLoggedIn, userRole,
        mobileMenuOpen, setMobileMenuOpen,
        artworks, userArtworks, userBids,
        newArtwork, setNewArtwork,
        filteredArtworks,
        searchTerm, filterCategory, filterPrice,
        selectedArtwork, setSelectedArtwork,
        bidAmount, setBidAmount,
        bidHistory,
        users, pendingArtworks, setPendingArtworks,

        // Handlers
        handleLogin, handleLogout,
        handleAddArtwork, handleDeleteArtwork,
        handleSearch, handleCategoryFilter, handlePriceFilter,
        handlePlaceBid,
        handleApproveArtwork, handleDeleteUser
    };
};

export default useAppState;