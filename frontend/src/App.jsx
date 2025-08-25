import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LostItemsPage from './pages/LostItemsPage';
import FoundItemsPage from './pages/FoundItemsPage';
import ReportPage from './pages/ReportPage';
import AboutPage from './pages/AboutPage'; // <-- Isko import karo
import ItemDetailsPage from './pages/ItemDetailsPage'; // Isko import karo
import { Toaster } from 'react-hot-toast'; // <-- Toster import karo

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-center" /> {/* <-- Toster yahan add karo */}
      <Header />
      <main className="flex-grow container mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lost" element={<LostItemsPage />} />
          <Route path="/found" element={<FoundItemsPage />} />
          <Route path="/report" element={<ReportPage />} />
          {/* Hum yahan aur bhi routes add karenge, jaise item details page ke liye */}
          {/* YEH NAYA ROUTE HAI */}
          <Route path="/items/:id" element={<ItemDetailsPage />} />
          <Route path="/about" element={<AboutPage />} /> {/* <-- Yeh naya route hai */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;