import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import { CartProvider } from '../context';
import './styles.css'

const LayoutPublic = () => {
    return(
        <div className="container-layout">
            <CartProvider>
                <div className="layout-header">
                    <Navbar />
                </div>
                
                <main className="layout-main">
                    <Outlet />
                </main>
                <footer className="layout-footer">
                    <Footer />
                </footer> 
            </CartProvider>
        </div>
    );
}

export default LayoutPublic;