
import React from "react";
import './styles.css';

const CardProduct = ({ product, onSelect }) => {
    const { description, image, name, price, stock } = product || {};
    return (
        <div className="card" onClick={() => onSelect(product)}>
            
            <img className="card-image" src={image} alt={name} />
            
            <div className="card-content">
                <h2 className="card-name">{name}</h2>
                <p className="card-description">{description}</p>
                <p className="card-price">${price}</p>
                <p className="card-stock">{stock} in stock</p>
            </div>
        </div>
    )
}

export default CardProduct;