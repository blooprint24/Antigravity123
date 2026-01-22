import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <div className="product-image-wrapper">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-overlay">
                    <button className="icon-btn"><Heart size={20} /></button>
                    <button className="add-to-cart-btn">
                        <ShoppingCart size={18} /> Quick Add
                    </button>
                </div>
                {product.isNew && <span className="badge new">New</span>}
                {product.onSale && <span className="badge sale">Sale</span>}
            </div>
            <div className="product-info">
                <p className="product-brand">{product.brand}</p>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">
                    {product.onSale ? (
                        <>
                            <span className="current-price">${product.price}</span>
                            <span className="old-price">${product.oldPrice}</span>
                        </>
                    ) : (
                        <span className="price">${product.price}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

const ProductGrid = ({ title, products }) => {
    return (
        <section className="product-grid-section container">
            <div className="section-header">
                <h2 className="heading">{title}</h2>
                <a href="/all" className="view-all">View All</a>
            </div>
            <div className="product-grid">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export { ProductCard, ProductGrid };
