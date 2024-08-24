import React from 'react';
import { DataProvider } from './DataContext';
import { Route, Routes } from "react-router-dom";
import Navbar from './components/NavBar';
import { Contact, Home, Statistics, Model } from "./components/pages";
import Loader from '../public/Loader';
import usePageLoader from './hooks/usePageLoader'; 

function App() {
    const loading = usePageLoader();

    return (
        <DataProvider>
            {loading && <Loader />}
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/model" element={<Model />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </DataProvider>
    );
}

export default App;
