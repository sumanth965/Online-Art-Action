
MongoDB Projects (C Section)
"Based on the given scenario, design an appropriate MongoDB schema, prepare a schema diagram (or ER diagram equivalent), and design a simple user interface (UI) to interact with the system."
Submission Date: November 10, 2025 to November 15, 2025

10. Online Art Auction
Description:
Artists upload their artworks for auction. Each piece has title, category, base price, and artist. Bidders place bids, and the highest bid wins. Artworks can be sold or unsold. Auctions record bids, dates, and buyers.
👉 Collections: artworks, artists, bids, buyers
👉 Attributes: artworkTitle, category, artistName, basePrice, bidAmount, buyerName, soldStatus
Queries:
1.	List artworks sold above ₹1 lakh.
2.	Find artists whose works were unsold.
3.	Show bidders who won multiple auctions.
4.	Calculate average bid per artwork.
5.	Retrieve artworks bid on by 5+ users.
6.	Identify highest bid artwork in each category.
7.	Show auctions where no bids were placed.
8.	Find artists featured in multiple auctions.
9.	Retrieve top 3 bidders by total spend.
10.	List categories with the most artworks.


"Based on the above scenario, design an appropriate MongoDB schema, prepare a schema diagram (or ER diagram equivalent), and design a simple user interface (UI) to interact with the system."
Submission Date: November 10, 2025 to November 15, 2025








src/
│
├── components/
│   ├── Navbar.jsx
│   ├── ArtworkCard.jsx
│   ├── ArtworkGrid.jsx
│   ├── BidForm.jsx
│   ├── Loader.jsx
│   ├── Footer.jsx
│
├── pages/
│   ├── HomePage.jsx
│   ├── ArtworkListingPage.jsx
│   ├── ArtworkDetailPage.jsx
│   ├── ArtistDashboard.jsx
│   ├── BuyerDashboard.jsx
│   ├── AdminPanel.jsx
│   ├── AnalyticsPage.jsx
│   ├── LoginPage.jsx
│
├── context/
│   ├── AuthContext.jsx
│   ├── ArtworksContext.jsx
│
├── data/
│   ├── artworksData.js
│   ├── usersData.js
│
├── utils/
│   ├── helpers.js
│   ├── formatCurrency.js
│
├── App.jsx
├── index.js
└── styles/
    ├── globals.css
    ├── animations.css
