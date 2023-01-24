
import React, {useState, useEffect, useContext} from 'react';
import { CartContext } from '../../context';
import { useNavigate } from 'react-router-dom';

import Loader from '../../components/loader/Loader'
import FilterProducts from '../../components/filter-products/FilterProducts';
import './styles.css'
import CardProduct from '../../components/card/CardProduct';
import { firebaseServices } from '../../services/firebase';

const { getProducts, getCategories, getProductsByCategory } = firebaseServices;

const Home = () => {
    
    /************ Al clickear en una card de producto te llevara al detail */
    const navigate = useNavigate();

    // función para ir a detalles del producto
     const onHandlerSelect = (product) => {
          navigate(`/product/${product.id}`);
      }
    
      /****************************************************** */

      /**Forma en que lo hace el profe: */
      const {products, setProducts} = useContext(CartContext);
      const [loading, setLoading] = useState(true);
      const [categories, setCategories] = useState([]);

      useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const allProducts = await getProducts();
                const allCategories = await getCategories();
                setProducts(allProducts);
                setCategories(allCategories);
            } catch (error) {
                console.log(error);
            }
            finally{
                setLoading(false);
            }
        }

        getData();

      },[])


      /************************************************************ */

      const onFilter = async (id) => {
        const filterByCategory = await getProductsByCategory(id);
        setProducts(filterByCategory);
      }

    return(
        <div className='home-container'>
            <h1 className='h1-home'>Tecnología de punta</h1>
            {loading && <Loader/>}

            <div className='filter-menu-container'>
                {categories && categories.map((category) => (
                    <FilterProducts key={category.id} {...category} onFilter={onFilter}/>
                ))}
            </div>

            <section className='products-container'>
               { products.map(product => (
                    <CardProduct 
                    product={product} 
                    key={product.id} 
                    onSelect={onHandlerSelect}
                    />
                    ))
                }
            </section>
        </div>
    )
}

export default Home;