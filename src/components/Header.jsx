import React from 'react';
import { Search, ShoppingBag, User, Menu } from 'lucide-react';

const Header = () => {
    return (
        <header className="sticky-header">
            <div className="promo-bar">
                <span>END OF SEASON SALE: UP TO 50% OFF | SHOP NOW</span>
            </div>
            <div className="main-nav container">
                <div className="nav-left">
                    <button className="menu-btn"><Menu size={24} /></button>
                    <button className="search-btn"><Search size={24} /></button>
                </div>

                <div className="logo-container">
                    <a href="/">
                        <img src="/src/assets/logo.png" alt="SCORE 229" className="logo" />
                    </a>
                </div>

                <div className="nav-right">
                    <div className="nav-icons">
                        <a href="/account" className="nav-link"><User size={24} /></a>
                        <div className="cart-icon-container">
                            <a href="/cart" className="nav-link"><ShoppingBag size={24} /></a>
                            <span className="cart-badge">0</span>
                        </div>
                    </div>
                </div>
            </div>
            <nav className="category-nav container">
                <ul>
                    <li><a href="/men">MEN</a></li>
                    <li><a href="/women">WOMEN</a></li>
                    <li><a href="/kids">KIDS</a></li>
                    <li><a href="/shoes">SHOES</a></li>
                    <li><a href="/apparel">APPAREL</a></li>
                    <li><a href="/accessories">ACCESSORIES</a></li>
                    <li><a href="/sale" className="text-red">SALE</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
