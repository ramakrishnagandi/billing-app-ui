import React, { useEffect, useState } from "react";
import './../billing.css';
import axios from "axios";

export default function OrdersList() {
    const [orders, setOrders] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [showItems, setShowItems] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const response = await axios.get('http://localhost:8989/api/order');
        console.log(response);
        setOrders(response.data);
    }

    const viewItems = async (id) => {
        alert();
    };

    const handleView = async (order) => {
        console.log(order);
        setSelectedItems(order.orderItems);
        setShowItems(true);
    };

    const closeModal = () => {
        setShowItems(false);
        setSelectedItems([]); // Clear selected items when modal is closed
    };

    return (
        <div className="container">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col" classname="table-header-danger">Id</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">No of Items</th>
                            <th scope="col">View Items</th>
                            <th scope="col">Total Amount</th>
                            <th scope="col">Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, index) => (
                                <tr>
                                    <th scope="row" key={index}>
                                        {index + 1}
                                    </th>
                                    <td>{order.customer.firstName}  {order.customer.lastName}</td>
                                    <td>{order.totalItems}</td>
                                    <td>
                                        <button className="btn btn-primary max-2"
                                            onClick={() => handleView(order)}>
                                            View
                                        </button>
                                    </td>
                                    <td>{order.totalAmount}</td>
                                    <td className={order.orderStatus === 'Success' ? 'bg-success' : 'bg-danger'}>
                                        {order.orderStatus}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {
                showItems && (
                    <div
                        className="modal"
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <div
                            className="modal-content"
                            style={{
                                backgroundColor: '#fff',
                                padding: '20px',
                                borderRadius: '5px',
                                width: '80%',
                                maxHeight: '80%',
                                overflowY: 'auto'
                            }}
                        >
                            <h3>Items List</h3>
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
                                    {selectedItems.map((product, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{product.productName}</td>
                                            <td>{product.pricePerUnit}</td>
                                            <td>{product.quantity}</td>
                                            <td>{product.totalPrice}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button className="btn btn-secondary" onClick={closeModal}>
                                Close
                            </button>
                        </div>
                    </div>
                )
            }
        </div >



    );

};

