import React from 'react';
import { Link } from 'react-router-dom';
//import { useLocation } from "react-router-dom";
import './styles.css';

const FinalProcess = ({formData}) => {
    //const { state } = useLocation() || {};

    
    const { 
        buyer, 
        cuotes, 
        createAt, 
        creditCard, 
        items, 
        paymentMethod, 
        sellId, 
        seller, 
        shipping, 
        shippingMethod, 
        total, 
        totalQuantity} = formData;


    return(
        <div className='receipt-container'>
            
            <div className='receipt-headers'>
            <h3 className='receipt-logo'>GB <span>S.A</span></h3>
                <span>Ticket nro: {sellId}</span>
                <span>{createAt.toLocaleString()}</span>
            </div>

            <h2 className='receipt-h2'>TICKET</h2>

            <section className='receipt-section'>
                <h3 className='receipt-h3'>Vendedor:</h3>
                <ul className='receipt-ul'>
                    <li className='receipt-ul-li'><b>Nombre:</b> {seller.name}</li> 
                    <li className='receipt-ul-li'><b>Email:</b> {seller.email}</li>
                    <li className='receipt-ul-li'><b>Telefono:</b> {seller.phone}</li>
                    <li className='receipt-ul-li'><b>Dirección:</b> {seller.address} </li>
                </ul>
            </section>
            
            <section className='receipt-section'>
                <h3 className='receipt-h3'>Comprador:</h3>
                <ul className='receipt-ul'>
                    <li className='receipt-ul-li'><b>Nombre:</b> {buyer.name}</li>
                    <li className='receipt-ul-li'><b>Email:</b> {buyer.email}</li>
                    <li className='receipt-ul-li'><b>Telefono:</b> {buyer.phone}</li>
                    <li className='receipt-ul-li'><b>Dirección:</b> {buyer.address}</li>
                </ul>
            </section>

            <section className='receipt-section'>
                <h3 className='receipt-h3'>Pago:</h3>
                <ul className='receipt-ul'>
                    <li className='receipt-ul-li'><b>Paga con:</b> {paymentMethod}</li>
                    <li className='receipt-ul-li'><b>Tarjeta de credito:</b> {creditCard || '---'}</li>
                    <li className='receipt-ul-li'><b>Cuotas:</b> {cuotes || '---'} {cuotes && <>x <span>${Math.round((total / cuotes) * 1.50) }</span></>}</li>
                </ul>
            </section>
            
            <section className='receipt-section'>
                <h3 className='receipt-h3'>Envio</h3>
                <ul className='receipt-ul'>
                    <li className='receipt-ul-li'><b>Tipo:</b> {shippingMethod}</li>
                    <li className='receipt-ul-li'><b>Entrega:</b> {shipping.deliveryDate.toLocaleString() || '---'}</li> 
                    <li className='receipt-ul-li'><b>Nro Envío:</b> {shipping.trackingNumber || '---'}</li>
                </ul>
            </section>

            <section className='items-container'>
                <h3 className='receipt-h3 items-title'>Items</h3>
                {items.map((product, index) => {
                return <ul key={index} className='receipt-ul ul-items'>
                        <li className='ul-items-li li-name'><b>Item:</b> <span>{product.name}</span></li>
                        <li className='ul-items-li li-price'><b>Precio:</b> <span>${product.price}</span></li>
                        <li className='ul-items-li li-qty'><b>Cant:</b> <span>{product.quantity}</span></li>
                        <li className='ul-items-li li-id'><b>Id:</b> <span>{product.id}</span></li>
                    </ul>
                })}
            </section>

            
            <section className='totals'>
                <p className='cant-total'><b>Total productos:</b> <span>{totalQuantity} Items</span></p>
                <p className='cant-total'><b>Total a pagar:</b> <span>${total}ARS</span></p> 
            </section>
            
            <div className='pay-button-container'>
                <Link to='/thanks' className='pay-button'>Confirmar y pagar</Link>
            </div>
            
            
        </div>
    );
}

export default FinalProcess;