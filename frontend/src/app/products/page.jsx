"use client"
import { useState, useEffect, useContext } from 'react';
import UserContext from '@/context/UserContext';

export default function ProductsPage() {
    const { user } = useContext(UserContext)
    const [products, setProducts] = useState([]);
    const [alertMessage, setAlertMessage] = useState(null); 

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await fetch('http://localhost:8080/api/products', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Origin: 'http://localhost:3000',
              },
              credentials: 'include',
            });
            const data = await response.json();
            setProducts(data.payload);
          } catch (error) {
            setAlertMessage("No se pudo conectar con el servidor, intente mas tarde")
            console.error('Error fetching products:', error);
          }
        };
    
        fetchProducts();
      }, []);

    return (
        <div className="container mainContainer">
            {alertMessage && <div className="alert alert-danger" style={{ maxWidth: '500px', margin: '2rem auto' }}>{alertMessage}</div>}
            {user && <div className="alert alert-primary" style={{ maxWidth: '500px', margin: '2rem auto' }}>Hola {user.first_name}, tu rol es {user.role} </div>}
            <div className="row">
                {products.map(product => (
                    <div className="col-12 col-md-6" key={product._id}>
                        <div className="card border-light mb-3 container artifactCard">
                            <div className="row">
                                <div className="col-4 d-flex align-items-center justify-content-center">
                                    <img src={product.thumbnails[0]} className="img-fluid" alt="..." />
                                </div>
                                <div className="col-8">
                                    <div className="card-body">
                                        <h4 className="card-title itemName">{product.title}</h4>
                                        <p className="card-text itemType">{product.description}</p>
                                        <p className="card-text itemInfo">Codigo: {product.code}</p>
                                        <p className="card-text itemInfo">Stock: {product.stock}</p>
                                        <p className="card-text itemInfo">Precio: {product.price} <img src="/img/coin.png" alt="Monedas" /></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}