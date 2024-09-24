import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import authService from "../Auth/AuthService";

const OrderForm = () => {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [pricePerUnit, setPricePerUnit] = useState(0);
    const [newProduct, setNewProduct] = useState({
        productId: '', quantity: '', price: ''
        , totalPrice: '', customerId: '', orderStatus: '', totalAmount: ''
    });



    useEffect(() => {
        axios.get('http://localhost:8989/api/products')
            .then(response => {
                const productOptions = response.data.map(product => ({
                    value: product.productId,
                    label: product?.productName // Use optional chaining to avoid errors
                        ? product.unit
                            ? `${product.productName}-${product.unit}` // If productUnit exists
                            : product.productName // If productUnit is empty
                        : 'Unknown Product',
                    price: product.price || 0
                }));
                setProducts(productOptions);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    useEffect(() => {
        authService.getAllUsers()
            .then(response => {
                const userOptions = response.data.map(user => (
                    {
                        value: user.id,
                        label: user.name
                    }
                ));
                console.log(userOptions);
                setUsers(userOptions);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });

    }, []);

    const handleInputChange = (e) => {
        console.log(e);
        setSelectedProduct(e);
        setPricePerUnit(e.price);
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
        console.log(newProduct);
    };

    return (
        <div className="container">
            <h3>Add New Order</h3>
            <div className="input-group mb-3 shadow">
                <input type="text" className="form-control" name="customerId" placeholder="Enter Cusomer"
                    value={newProduct.customerId} onChange={handleInputChange} />
            </div>


            <div className="input-group mb-3 shadow">
                <Select className="form-control"
                    name="productId"
                    value={selectedProduct}
                    onChange={handleInputChange}
                    options={products}
                    placeholder="Search for products..."
                />
                <input type="text" className="form-control"
                    name="price"
                    placeholder="Price"
                    value={pricePerUnit}
                    readOnly />

                <input type="number" className="form-control"
                    name="quantity"
                    placeholder="Quantity"
                    onChange={handleInputChange} />

                <button className="btn btn-primary" onClick='#'>Add Product</button>
            </div>




        </div>
    );
};

export default OrderForm;
