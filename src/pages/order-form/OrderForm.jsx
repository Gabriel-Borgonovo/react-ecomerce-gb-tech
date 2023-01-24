import React, { useContext, useState, useEffect } from 'react';
import Modal from '../../components/modal/Modal'

import { CartContext } from '../../context';
import { useModal } from '../../hooks/useModal';
import { firebaseServices } from '../../services/firebase';
import './styles.css';
import FinalProcess from '../final-process/FinalProcess';

const {createOrder} = firebaseServices;

const OrderForm = () => {
    const [showCreditCardFields, setShowCreditCardFields] = useState(false);
    const [showButton, setShowButton] = useState(true);

    const [formData, setFormData] = useState({
        buyer: {
            address: "",
            email: "",
            name: "",
            phone: ""
        },
        createAt: "",
        sellId: "",
        items: [],
        paymentMethod:"",
        creditCard:"",
        cuotes:0,
        seller: {
            email: "GabrielB@gmail.com",
            id: "1",
            name: "Gabriel",
            phone: "03572506804",
            address: "Av. Siempreviva"
        },
        shipping: {
            deliveryDate: "",
            trackingNumber: "",
        },
        shippingMethod: ""
     }
   );

   const [isOpen, openModal, closeModal] = useModal(false);

   const {cart} = useContext(CartContext);

   const calculateTotal = () => {  
    let totalQuantity = 0;
    let totalPrice = 0;
    let items = []
    cart.forEach(item => {
      totalQuantity += item.quantity;
      totalPrice += item.price * item.quantity;
      items.push({
          id: item.id,
          image: item.image,
          name: item.name,
          price: item.price,
          quantity: item.quantity
      })
    });
    console.log('items', items);
    setFormData(
        {
          ...formData,
          items: items,
          total: totalPrice,
          totalQuantity: totalQuantity,
          createAt: new Date(),
          sellId: Math.floor(Math.random() * 100000),
        },
      );
  }

  useEffect(()=> {
    calculateTotal();
  },[])


  const handleSubmit =  (event) => {

    event.preventDefault();
    if (formData.items.length > 0) {
        createOrder(formData);

        setShowButton(false);
    }

}


/**Función genérica para recolectar los datos del buyer mediante el formulario */
const handleChange = (field, value) => {
    setFormData({
        ...formData,
        buyer: {
            ...formData.buyer,
            [field]: value
        },
    });
}

/**Función para seleccionar el método de pago */

const handlePaymentMethodChange = (event) => {
    setFormData({
        ...formData,
        paymentMethod: event.target.value
    });
    if (event.target.value === 'Tarjeta de crédito') {
        setShowCreditCardFields(true);
    } else {
        setShowCreditCardFields(false);
    }
}

/**Si es tarjeta de crédito */

const chooseCreditCard = (event) => {
    setFormData({
        ...formData,
        creditCard: event.target.value
    });
}

const handleCuotasChange = (cuotes) => {
    setFormData({
        ...formData,
        cuotes: cuotes
    });
}

/**seleccionar método de envio */

const handleShippingMethod = (event) => {
    if (event.target.value === 'Envio a Domicilio') {
        const shippingDate = new Date();
        shippingDate.setDate(shippingDate.getDate() + 3);
        setFormData({
            ...formData,
            shipping: {
                deliveryDate: shippingDate,
                trackingNumber: Math.floor(Math.random() * 1000000),
            },
            shippingMethod: event.target.value
        });
    }else{
        setFormData({
            ...formData,
            shippingMethod: event.target.value
        })
    }
}

    return(
        <div className='container-order-form'>
            
            {showButton && 
            <>
            <h3 className='order-form-h3'>Generar orden</h3>
            <form className='order-form' onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    onChange={(e) => handleChange('name', e.target.value)} 
                    placeholder='Nombre completo' 
                    required
                />
                <input 
                    type="email" 
                    onChange={(e) => handleChange('email', e.target.value)} 
                    placeholder='miemail@mail.com' 
                    required 
                />
                <input 
                    type="text" 
                    onChange={(e) => handleChange('address', e.target.value)} 
                    placeholder='Dirección' 
                    required 
                />
                <input 
                    type="number" 
                    onChange={(e) => handleChange('phone', e.target.value)} 
                    placeholder='Telefono' 
                    required 
                />

                <section className='selects-container'>

                <label className='label-paymentMethod-select'>
                Método de pago:
                <select onChange={handlePaymentMethodChange} className='select-paymentMethod' required>
                    <option value="">Seleccionar</option>
                    <option value="Efectivo">Efectivo</option>
                    <option value="Tarjeta de crédito">Tarjeta de crédito</option>
                </select>
                </label>

                {showCreditCardFields && <div className='card-cuotes-container'>
                    <label className='label-paymentMethod-select'>Tarjeta:
                        <select onChange={chooseCreditCard} className='select-paymentMethod' required>
                            <option value="">Seleccionar</option>
                            <option value="Visa">Visa</option>
                            <option value="Mastercard">Mastercard</option>
                        </select>
                    </label>

                    <div className='container-radios'>
                        <label className='label-paymentMethod-select'>Cantidad de cuotas:</label>
                        <div className='radios-options'>
                            <div className='radio-option'>
                               <input type="radio" name="cuotes" value="3" onChange={(e) => handleCuotasChange(e.target.value)} required />3 
                            </div>
                            <div className='radio-option'>
                               <input type="radio" name="cuotes" value="6" onChange={(e) => handleCuotasChange(e.target.value)} required />6
                            </div>
                            <div className='radio-option'>
                               <input type="radio" name="cuotes" value="12" onChange={(e) => handleCuotasChange(e.target.value)} required />12
                            </div>
                        </div>
                      </div>

                </div>
                }

                <label className='label-paymentMethod-select'>Metodo de envio:
                    <select onChange={handleShippingMethod} className='select-paymentMethod' required>
                        <option value="">Seleccionar</option>
                        <option value="Envio a Domicilio">Envio a Domicilio</option>
                        <option value="Retirar al local">Retirar al local</option>
                    </select>
                </label>

                </section>
                    <div>
                        <input type="submit" value='Generar orden' className='generate-order-button' />
                    </div>
                

            </form>
            </>
        }

            {showButton===false &&
                <>
                    <h3 className='order-form-h3'>Orden generada</h3>
                    <div className='created-order-container'>
                        <button className='created-order-button' onClick={openModal}>ver orden</button>
                    </div>

                    <Modal
                        isOpen={isOpen}
                        closeModal={closeModal}
                    >
                        <FinalProcess formData={formData}/>
                    </Modal>
                </>
                }

        </div>
    );
}

export default OrderForm;