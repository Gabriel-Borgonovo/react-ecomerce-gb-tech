import { addDoc, collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

export const firebaseServices = {
    getProducts: () => {
        const db = getFirestore();
        const getProductsCollection = collection(db, 'products');
        return getDocs(getProductsCollection)
                .then((snapshot) => {
                    if(snapshot.size === 0){ 
                        return []; 
                    }
                    return snapshot.docs.map((doc) => (doc.data()));
    })
    .catch((error) => {
        console.log(`Error getting documents: ${error}`);
    })},

    getProductsByCategory: (categoryid) => {
        const db = getFirestore();
        const q = query(
            collection(db, 'products'),
            where('categoryid', '==', categoryid),
        );

        return getDocs(q)
            .then((snapshot) => {
                if(snapshot.size === 0){ 
                    return []; 
                }

                return snapshot.docs.map((doc) => (doc.data()));
            })
            .catch((error) => {
                console.log(`Error getting documents: ${error}`);
            })
    },

    getCategories: () => {
        const db = getFirestore();
        const getCategoriesCollection = collection(db, 'categories');

        return getDocs(getCategoriesCollection)
            .then((snapshot) => {
                if(snapshot.size === 0){ 
                    return []; 
                }

                return snapshot.docs.map((doc) => (doc.data()));
            })
            .catch((error) => {
                console.log(`Error getting documents: ${error}`);
            })
    },

    createOrder: (order) => {
        const db = getFirestore();
        const orderCollection = collection(db, 'orders');
        return addDoc(orderCollection, order)
            .then((docRef) => {
                console.log('Document written with ID: ', docRef.id);
                return docRef.id;
            })
            .catch((error) => {
                console.log(`Error adding documents: ${error}`);
            })
     },

    getProductById: (productId) => {
        const db = getFirestore();

        const q = query(
            collection(db, 'products'),
            where('id', '==', productId)
        );

        return getDocs(q)
            .then((snapshot) => {
                if(snapshot.size === 0){ 
                    return []; 
                }

                return snapshot.docs.map((doc) => (doc.data()));
            })
            .catch((error) => {
                console.log(error);
            })
    },
    
}