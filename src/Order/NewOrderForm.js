import Select from 'react-select'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";


function NewOrderForm() {
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [newOrder, setNewOrder] = useState({
        customerId: '',
        totalAmount: 0,
        orderItems: []
    });

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(0);

    const [pricePerUnit, setPricePerUnit] = useState('');
    const [totalPrice, setTotalPrice] = useState('');

    useEffect(() => {
        fetchProducts();
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        const response = await axios.get('http://localhost:8989/api/customer/customers');
        setCustomers(response.data);
    };

    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:8989/api/products');
        setProducts(response.data);
    };

    useEffect(() => {
        console.log('Updated newProduct:', newOrder);
    }, [newOrder]);

    const productOptions = products.map(prod => ({
        value: prod.productId,
        label: prod?.productName // Use optional chaining to avoid errors
            ? prod.unit
                ? `${prod.productName}-${prod.unit}` // If productUnit exists
                : prod.productName // If productUnit is empty
            : 'Unknown Product',
        price: prod.price || 0
    }));

    const customerOptions = customers.map(cust => ({
        value: cust.customerId,
        label: cust.firstName
    }));

    const selectedCustomer = products.find(
        option => option.value === newOrder.customerId
    );

    const handleProductChange = (selectedOption) => {
        setSelectedProduct(selectedOption);
        setPricePerUnit(selectedOption.price);
        setNewOrder(prevProduct => ({
            ...prevProduct,
            productId: selectedOption.value
        }));
    }

    const handleCustomerChange = (selectedOption) => {
        setNewOrder(prevProduct => ({
            ...prevProduct,
            customerId: selectedOption.value
        }));
    };

    useEffect(() => {
        if (quantity > 0) {
            setTotalPrice((pricePerUnit * quantity).toFixed(2));
        }
    });

    const handleAddProduct = () => {
        console.log(quantity);
        if (selectedProduct && quantity > 0) {
            const newItem = {
                productId: selectedProduct.value,
                productName: selectedProduct.label,
                quantity,
                pricePerUnit,
                totalPrice: (pricePerUnit * quantity).toFixed(2)
            };

            setNewOrder({
                ...newOrder,
                orderItems: [...newOrder.orderItems, newItem],
                totalAmount: (parseFloat(newOrder.totalAmount) + parseFloat(newItem.totalPrice)).toFixed(2)
            });

            setSelectedProduct(null);
            setTotalPrice('');
            setPricePerUnit('');
            setQuantity(0);
        }
        console.log("Selected Order", newOrder);
    };

    return (
        <div className="container">
            <h3>Create New Order</h3>
            <div className="input-group mb-3">
                <Select
                    type="text"
                    className="form-control"
                    name="customerId"
                    value={selectedCustomer}
                    options={customerOptions}
                    onChange={handleCustomerChange}
                    placeholder="Enter Customer Name"
                >
                </Select>
                <Link className="btn btn-primary mb-3 shadow" to="/addCustomer">
                    Add Customer
                </Link>
            </div>

            <div className="input-group mb-3">
                <Select
                    type="text"
                    className="form-control"
                    name="productName"
                    value={selectedProduct}
                    options={productOptions}
                    onChange={handleProductChange}
                    placeholder="Enter Product Name">
                </Select>
                <input type="number" className="form-control"
                    name="quantity"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)} />

                <input type="text" className="form-control"
                    name="price"
                    placeholder="Actual Price"
                    value={pricePerUnit}
                    readOnly />

                <input type="text" className="form-control"
                    name="price"
                    placeholder="Total Price"
                    value={totalPrice}
                    readOnly />

                <Link className="btn btn-outline-danger mx-2" to="/">
                    Cancel
                </Link>
            </div>

            <div>
                <h3>Ordered Items</h3>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">S No</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {newOrder.orderItems.map((product, index) => (
                            <tr>
                                <th scope="row" key={index}>
                                    {index + 1}
                                </th>
                                <td>{product.productName}</td>
                                <td>{product.pricePerUnit}</td>
                                <td>{product.quantity}</td>
                                <td>{product.totalPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default NewOrderForm;
