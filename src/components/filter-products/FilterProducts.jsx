import React from 'react';
import './styles.css';

const FilterProducts = ({name, id, onFilter}) => {
    return(
        <div className='filter-products-container'>
            <button 
                className="filterproducts-button"
                id={id}
                onClick={() => onFilter(id)}>{name}</button>
        </div>
    );
}

export default FilterProducts;