// src/ProductList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [orderResult, setOrderResult] = useState(null);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    // Fetch products from an API or define them directly
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/products');
                setProducts(response.data); 
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Failed to fetch products');
                console.log(error.response ? error.response.data : error.message);
            }
        };

        fetchProducts();
    }, []);

    const handleCheckboxChange = (id) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handlePlaceOrder = async () => {
        try {
            // Filter products based on selectedItems
            const selectedProducts = products.filter(product => selectedItems.includes(product.id));
            // Process the order into packages
            const packages = processOrderIntoPackages(selectedProducts);

            setOrderResult({ packages });
        } catch (error) {
            console.error("There was an error processing the order", error);
        }
    };

    const processOrderIntoPackages = (products) => {
        const packages = [];
        let currentPackage = { items: [], totalWeight: 0, totalPrice: 0, courierCharge: 15 };

        // Sort products by price to ensure more expensive items are handled first
        products.sort((a, b) => b.price - a.price);

        products.forEach(product => {
            if (currentPackage.totalPrice + product.price <= 250 && currentPackage.totalWeight + product.weight <= 1000) {
                // Add the product to the current package
                currentPackage.items.push(product.name);
                currentPackage.totalWeight += product.weight;
                currentPackage.totalPrice += product.price;
            } else {
                // If current package exceeds the limit, start a new package
                packages.push(currentPackage);
                currentPackage = {
                    items: [product.name],
                    totalWeight: product.weight,
                    totalPrice: product.price,
                    courierCharge: 15,
                };
            }
        });

        if (currentPackage.items.length > 0) {
            packages.push(currentPackage);
        }

        return packages;
    };

    return (
        <div>
            <h1>Product List</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                {products.length === 0 ? (
                    <p>Loading products...</p>
                ) : (
                    products.map(product => (
                        <div key={product.id}>
                            <input
                                type="checkbox"
                                id={`item-${product.id}`}
                                onChange={() => handleCheckboxChange(product.id)}
                            />
                            <label htmlFor={`item-${product.id}`}>
                                {product.name} - ${product.price} - {product.weight}g
                            </label>
                        </div>
                    ))
                )}
            </div>
            <button onClick={handlePlaceOrder}>Place Order</button>

            {orderResult && (
                <div>
                    <h2>This order has the following packages:</h2>
                    {orderResult.packages.map((pkg, index) => (
                        <div key={index}>
                            <h3>Package {index + 1}</h3>
                            <p>Items - {pkg.items.join(', ')}</p>
                            <p>Total weight - {pkg.totalWeight}g</p>
                            <p>Total price - ${pkg.totalPrice}</p>
                            <p>Courier price - ${pkg.courierCharge}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;
