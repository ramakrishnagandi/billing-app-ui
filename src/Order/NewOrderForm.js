import Select from 'react-select'
import './../billing.css';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
import InvoicePopup from './InvoicePopup';


function NewOrderForm() {
    let navigate = useNavigate();
    const user = localStorage.getItem("username");
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [newOrder, setNewOrder] = useState({
        customerId: '',
        customerName: '',
        totalAmount: 0,
        orderStatus: '',
        createdUsername: user,
        totalItems: 0,
        orderItems: []
    });

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(0);

    const [pricePerUnit, setPricePerUnit] = useState('');
    const [totalPrice, setTotalPrice] = useState('');

    const [updateIndex, setUpdateIndex] = useState(null);
    const [showInvoice, setShowInvoice] = useState(false);
    const componentRef = useRef();

    useEffect(() => {
        console.log("---------------------------------------------------", user);
        fetchProducts();
        fetchCustomers();
    }, []);

    useEffect(() => {
        setNewOrder(prevOrder => ({
            ...prevOrder,
            totalItems: totalItems
        }));
    }, [newOrder.orderItems]);

    const orderStatusOptions = [
        { value: 'Success', label: 'Success' },
        { value: 'Failed', label: 'Failed' },
        { value: 'Pending', label: 'Pending' }
    ];

    const fetchCustomers = async () => {
        const response = await axios.get('http://localhost:8989/api/customer/customers');
        setCustomers(response.data);
    };

    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:8989/api/products');
        setProducts(response.data);
    };

    const handleGenerateInvoice = () => {
        setShowInvoice(true);
    };



    const handleSubmit = () => {
        console.log("All orders", newOrder);
        if (newOrder) {
            alert("Order creation failed");
        }
    };

    useEffect(() => {
        console.log('Updated newProduct:', newOrder);
    }, [newOrder]);

    const productOptions = products.map(prod => ({
        value: prod.productId,
        label: prod?.productName
            ? prod.unit
                ? `${prod.productName}-${prod.unit}`
                : prod.productName
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
            customerId: selectedOption.value,
            customerName: selectedOption.label
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

            if (updateIndex !== null) {
                const updatedItems = [...newOrder.orderItems];
                updatedItems[updateIndex] = newItem;

                const updatedTotalAmount = updatedItems.reduce((total, item) => total + parseFloat(item.totalPrice), 0);

                setNewOrder({
                    ...newOrder,
                    orderItems: updatedItems,
                    totalAmount: updatedTotalAmount.toFixed(2)
                });
                setUpdateIndex(null);

            } else {
                setNewOrder({
                    ...newOrder,
                    orderItems: [...newOrder.orderItems, newItem],
                    totalAmount: (parseFloat(newOrder.totalAmount) + parseFloat(newItem.totalPrice)).toFixed(2),

                });
            }

            setSelectedProduct(null);
            setTotalPrice('');
            setPricePerUnit('');
            setQuantity(0);
        }
        console.log("Selected Order", newOrder);
    };

    const totalItems = newOrder.orderItems.reduce((acc, item) => acc + parseInt(item.quantity), 0);

    const handleStatusChange = (selectedOption) => {
        setNewOrder(prevOrder => ({
            ...prevOrder,
            orderStatus: selectedOption.value
        }));
    };

    const handleUpdateProduct = (index) => {
        const productToUpdate = newOrder.orderItems[index];

        // Populate the fields with the selected product's details
        const selectedProductOption = productOptions.find(option => option.value === productToUpdate.productId);

        setSelectedProduct(selectedProductOption);
        setQuantity(productToUpdate.quantity);
        setPricePerUnit(productToUpdate.pricePerUnit);
        setTotalPrice(productToUpdate.totalPrice);
        setUpdateIndex(index); // Set the update index to track which product is being updated
    };

    const handleRemoveProduct = (index) => {
        const removedItem = newOrder.orderItems[index];
        const updatedItems = newOrder.orderItems.filter((_, i) => i !== index);

        setNewOrder(prevOrder => ({
            ...prevOrder,
            orderItems: updatedItems,
            totalAmount: (parseFloat(prevOrder.totalAmount) - parseFloat(removedItem.totalPrice)).toFixed(2)
        }));
    };

    const handleCloseInvoice = () => {
        setShowInvoice(false);
    };

    const handleAddCustomer = () => {
        navigate("/addCustomer");
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current, // Reference the component to print
    });

    return (
        <div className="container">
            <h4 className="text-primary ">Create New Order</h4>
            <div className="input-group mb-3 shadow-grey">
                <Select
                    type="text"
                    className="form-control"
                    name="customerId"
                    value={selectedCustomer}
                    options={customerOptions}
                    onChange={handleCustomerChange}
                    placeholder="Enter Customer Name"
                />
                <button className="btn btn-primary shadow-grey" onClick={handleAddCustomer}>
                    Add Customer
                </button>
            </div>

            <div className="input-group mb-3 shadow-grey">
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

                <button type="button" className="btn btn-primary  shadow-grey" onClick={handleAddProduct}>
                    {updateIndex !== null ? "Update Product" : "Add Product"}
                </button>
            </div>

            <div>
                <h4 className="text-primary">Added Items</h4>
                <table className="table border shadow-grey ">
                    <thead>
                        <tr>
                            <th scope="col" className="table-header">S No</th>
                            <th scope="col" className="table-header">Product Name</th>
                            <th scope="col" className="table-header">Price</th>
                            <th scope="col" className="table-header">Quantity</th>
                            <th scope="col" className="table-header">Total Price</th>
                            <th scope="col" className="table-header">Action</th>
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
                                <td>
                                    <button className="btn btn-warning me-2" onClick={() => handleUpdateProduct(index)}>
                                        Update
                                    </button>

                                    <button className="btn btn-danger" onClick={() => handleRemoveProduct(index)}>
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="row justify-content-end align-items-center mb-3">
                    <div className="col-auto">
                        <h5>Total Items: {newOrder.totalItems}</h5>
                        <h5>Total Amount: {newOrder.totalAmount}</h5>
                    </div>
                    <div className="col-auto">
                        <Select
                            type="text"
                            className="form-control"
                            name="status"
                            value={orderStatusOptions.find(option => option.value === newOrder.status)}
                            options={orderStatusOptions}
                            onChange={handleStatusChange}
                            placeholder="Order Status"
                        />
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-danger shadow-grey" onClick={handleGenerateInvoice}>
                            Generate Invoice
                        </button>
                    </div>
                </div>

            </div>

            {showInvoice && (
                <InvoicePopup ref={componentRef} newOrder={newOrder} onClose={handleCloseInvoice} />
            )}
        </div>
    );
}

export default NewOrderForm;
