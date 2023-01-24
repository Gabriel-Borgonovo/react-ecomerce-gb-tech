# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.


...
## Pre-requisitos
- [Visual Studio Code]('https://code.visualstudio.com/')
- [NodeJs > 16]('https://nodejs.org/es/') y npm. (Recomendación usar [nvm]('https://github.com/nvm-sh/nvm'))

...
## Estructura de Carpetas
- `src`: Es la carpeta contenedora de todo el código de la aplicación de React y contiene todas las funcionalidades.
    - `components`: Es la carpeta que contiene todos los componentes de nuestra aplicación (Ej: Navbar, Products, etc...).
    - `Context`: Es la carpeta que contiene el contexto de la aplicación, es decir, practicamente toda la lógica del carrito de compras (Ej: agregar y quitar productos del carrito, limpiar el carrito, etc).
    - `hooks`: Contiene un custome hook para el manejo de una ventana modal.
    - `layout`: Esta carpeta contiene el archivo principal que establece como están ordenados los componentes principales de la página (Ej: el header, main, footer).
    - `pages`: Contiene todas lás páginas de nuestra SPA (Ej: cart, detail,home,etc).
    - `router`: Este archivo se encarga de establecer las rutas de la aplicación del carrito de compras y asociar cada ruta con el componente correspondiente. 
    -`services`: Esta carpeta contiene una subcarpeta llamada firebase, que contiene un archivo que se encarga de abstraer las principales funciones para consumir los servicios de firestore.


---------------------------
# Archivo principal
### `index.js`

Este archivo es el punto de entrada de la aplicación. Utiliza `ReactDOM` para renderizar la aplicación en el elemento con ID `root` en el archivo `index.html`. Proporciona el enrutamiento a través de la aplicación utilizando el componente `RouterProvider` de `react-router-dom` y se importa el objeto `router` del archivo de enrutamiento. También se configura Firebase para la aplicación utilizando la función `initializeApp` y una configuración proporcionada.



# Archivo de enrutamiento
### `router`

Este archivo se encarga de establecer las rutas de la aplicación del carrito de compras y asociar cada ruta con el componente correspondiente.

## Importaciones

- `createBrowserRouter` de `react-router-dom` se utiliza para crear una instancia del enrutador. 
- `LayoutPublic` es el componente principal que se utiliza como contenedor para todas las páginas de la aplicación.
- Los componentes de página importados son: `Cart`, `Detail`, `FinalProcess`, `Home`, `NotFound`, `OrderForm` y `Thanks`.

## Configuración del enrutador

La ruta principal '/' está asociada con el componente `<LayoutPublic />` y su componente de error es `<NotFound />`.

Se definen las siguientes rutas:
- `/cart` está asociada con el componente `<Cart />`.
- `/product/:id` está asociada con el componente `<Detail />`.
- `/order-form` está asociada con el componente `<OrderForm />`.
- `/final-process` está asociada con el componente `<FinalProcess />`
- `/thanks` está asociada con el componente `<Thanks />`



# Componente LayoutPublic
### `<LayoutPublic />`

Este componente actúa como contenedor principal para los componentes de la aplicación de carrito de compras en React. Proporciona el contexto del carrito de compras y estructura la página con una barra de navegación y un pie de página.

## Importaciones

- `Outlet` de `react-router-dom` se utiliza para mostrar el componente correspondiente a la ruta actual.
- Los componentes `Footer` y `Navbar` son importados como parte de la estructura de la página.
- `CartProvider` es un componente que proporciona el contexto para el carrito de compras.

## Estructura

El componente está estructurado de la siguiente manera:
- `CartProvider` envuelve todos los elementos dentro del componente `LayoutPublic`.
- `<Navbar />` se utiliza como barra de navegación.
- `<Outlet />` se utiliza para mostrar el componente correspondiente a la ruta actual.
- `<Footer />` se utiliza como pie de página.


# Context
Este archivo es el contexto de un carrito de compras, donde se manejan las funciones y estado del carrito.

## Funciones
- `onIncreaseItem(id):` Agrega un item al carrito.
- `onDecreaseItem(id):` Quita un item del carrito.
- `getQuantity(id):` Obtiene la cantidad de un producto en el carrito.
- `total:` Calcula el total de los items en el carrito.
- `resetCart():` Vacía el carrito.

Este archivo es importado en los componentes necesarios para tener acceso a las funciones y estado del carrito.

# firebaseServices
Este archivo contiene varias funciones que permiten interactuar con una base de datos de Firebase Firestore. Algunas de las funciones incluyen:

## Funciones
- `getProducts()`: Obtiene todos los productos de la colección de "products" en Firestore.
- `getProductsByCategory(categoryid)`: Obtiene todos los productos de una determinada categoría en la colección de "products" en Firestore.
- `getCategories()`: Obtiene todas las categorías de la colección de "categories" en Firestore.
- `createOrder(order)`: Crea un nuevo pedido en la colección de "orders" en Firestore.
- `getProductById(productId)`: Obtiene un producto específico por su ID en la colección de "products" en Firestore.

Todas estas funciones utilizan funciones como `collection()`, `getDocs()`, `addDoc()` y `query()` de Firebase para interactuar con la base de datos.

************************
# Componente Navbar
### `<Navbar />`
Este componente se encarga de mostrar la barra de navegación en la parte superior de la aplicación.

## Hooks utilizados
- `useContext` permite obtener el contexto del carrito de compras y acceder al número de elementos en el carrito.

## Componentes utilizados
- `Link` de `react-router-dom` permite navegar a diferentes páginas de la aplicación al hacer clic en los elementos de la barra de navegación.
- `CartIcon` muestra un ícono del carrito con el número de elementos en el carrito.

# Componente CartIcon
### `<CartIcon />`
Este componente se encarga de mostrar un ícono del carrito con el número de elementos en el carrito en la barra de navegación de la aplicación.

## Props utilizadas
- `numberOfItems` permite mostrar el número de elementos en el carrito en el ícono del carrito.

# Componente Home
### `<Home />`

Este componente es la página principal de la aplicación de carrito de compras en React. Se encarga de mostrar la lista de productos, las categorías de productos, y filtros para buscar productos.

## Hooks utilizados

- `useNavigate` de `react-router-dom` se utiliza para navegar a la página de detalles del producto cuando se hace clic en una tarjeta de producto.
- `useContext` de React se utiliza para obtener el contexto del carrito de compras y acceder a la lista de productos.
- `useState` de React se utiliza para manejar el estado de carga de la página y la lista de categorías de productos.
- `useEffect` de React se utiliza para obtener los productos y las categorías de productos de la base de datos Firebase al montar el componente.

## Componentes utilizados

- `FilterProducts` se utiliza para mostrar los filtros de categoría de productos.
- `CardProduct` se utiliza para mostrar la tarjeta de cada producto.

## Funciones utilizadas

- `onFilter` se utiliza para filtrar los productos por categoría.


# FilterProducts
### `<FilterProducts />`
El componente FilterProducts es un botón que permite filtrar los productos mostrados en pantalla según su categoría. Toma como propiedades `name`, `id` y `onFilter`. Al hacer clic en el botón, se ejecuta la función `onFilter` pasándole como parámetro el `id` de la categoría seleccionada.


# CardProduct
### `<CardProduct />`

El componente `CardProduct` es una tarjeta que muestra información de un producto, como su imagen, nombre, descripción, precio y stock. El componente recibe un objeto `product` como propiedad y utiliza sus valores para mostrar la información en la tarjeta. También tiene una función `onSelect` que es llamada cuando se hace clic en la tarjeta, la cual es pasada como propiedad y recibe el objeto `product` como argumento.


# Detail
### `<Detail />`

Este componente es una página de detalle de producto. Utiliza el hook `useEffect` para buscar un producto específico en la base de datos de Firebase a través del `id` pasado en la ruta. También utiliza el contexto `CartContext` para interactuar con el carrito de compras, como aumentar o disminuir la cantidad de un producto seleccionado. Muestra información del producto como su nombre, descripción, precio, stock y una imagen. También tiene un botón para ir al carrito de compras. Utiliza un `Loader` mientras se está buscando el producto en la base de datos.

# Cart
### `<Cart />`

El componente `Cart` es un componente de React que muestra los productos que están en el carrito. Utiliza el contexto `CartContext` para acceder al estado del carrito y las funciones necesarias para manejar el carrito. Si el carrito está vacío, se muestra un mensaje y un botón para ir a comprar. Si hay productos en el carrito, se muestra una lista de productos mediante el componente `ProductInCart` y un botón para generar una orden de compra. También se muestra el total del carrito.

# ProductInCart
### `<ProductInCart />`

El componente `ProductInCart` es un componente de React que se utiliza para mostrar un producto dentro del carrito de compras.

Recibe las siguientes propiedades como entrada:

- `id`: el id del producto;
- `stock`: la cantidad de stock disponible del producto
- `image`: la url de la imagen del producto
- `name`: el nombre del producto
- `price`: el precio del producto
- `quantity`: la cantidad de productos seleccionados para comprar
- `onRemoveItem`: una función que se llama cuando se hace clic en el botón de eliminar
- `onIncreaseItem`: una función que se llama cuando se hace clic en el botón de aumentar la cantidad
- `onDecreaseItem`: una función que se llama cuando se hace clic en el botón de disminuir la cantidad

Muestra una vista de un producto dentro del carrito, incluyendo su imagen, nombre, precio, cantidad y botones para aumentar o disminuir la cantidad o para eliminar el producto del carrito.

# OrderForm
### `<OrderForm />`

El componente `OrderForm` es un formulario donde el usuario puede ingresar sus datos personales y de envío para realizar una compra. Cuando el usuario envía el formulario, se calcula el total de la compra a partir del carrito de compras y se almacena en un objeto `formData`. También se solicita al usuario que elija el método de pago y de envío. Si el usuario elige pagar con tarjeta de crédito, se le muestran campos adicionales para ingresar los detalles de la tarjeta y el número de cuotas. Una vez que el usuario envía el formulario, se llama a una función `createOrder` que se encarga de guardar la orden en una base de datos. El componente también tiene una función `handleSubmit` que se encarga de validar que los campos obligatorios del formulario esten llenos antes de permitir el envio del formulario.


# Modal
### `<Modal />`

Modal es un componente de React que permite mostrar una ventana emergente con un contenido específico.

El componente recibe tres props:

- `children`: que es el contenido que se mostrará dentro de la ventana emergente.
- `isOpen`: un valor booleano que indica si la ventana está abierta o cerrada.
- `closeModal`: una función que se encarga de cerrar la ventana emergente.

El componente tiene una estructura básica con un `article` que tiene una clase `ventana` que se le agrega la clase `is-open` cuando la ventana está abierta, y un `div` que contiene el contenido de la ventana y un botón para cerrar la ventana.

La función `handleModalContainerClick` se encarga de detener la propagación del evento al hacer click en el contenedor del modal, para evitar que al hacer click dentro del modal, se cierre automáticamente.


# FinalProcess
### `<FinalProcess />`

El componente `FinalProcess` es un componente de React que muestra un comprobante de compra al usuario. Recibe como prop un objeto `formData` que contiene información sobre el comprador, el vendedor, el método de pago, los detalles de envío, y los productos comprados. El componente desestructura el objeto `formData` y usa los datos para mostrar la información en formato de recibo.

El componente tiene una estructura de secciones con títulos y listas que muestran los datos correspondientes. Por ejemplo, una sección "Vendedor" muestra el nombre, correo electrónico, teléfono y dirección del vendedor. Otro ejemplo es la sección "Pago" que muestra el método de pago y los detalles de tarjeta de crédito si esa fue la opción elegida.


# Thanks
### `<Thanks />`

`Thanks` es un componente de React que muestra una pantalla de agradecimiento después de realizar una compra. Utiliza el contexto `CartContext` para resetear el carrito de compras y un botón `Link` para redirigir al usuario a la página principal.


# NotFound
### `<NotFound />`

Finalmente, el componente `NotFound` se utiliza para mostrar una página de error 404. Utiliza el hook `useRouteError` de React Router para recuperar cualquier error generado en la ruta actual y lo muestra en la pantalla. También contiene un enlace para volver al inicio de la aplicación.
