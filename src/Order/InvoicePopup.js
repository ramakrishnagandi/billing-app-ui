import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import './../InvoicePopup.css';
import { useReactToPrint } from 'react-to-print';

const InvoicePopup = ({ newOrder, onClose }) => {
    const componentRef = useRef();
    const printRef = useRef();

    useEffect(() => {
        console.log(newOrder);
    }, [newOrder]);

    const handlePaid = () => {
        const updatedOrder = {
            ...newOrder,
            orderStatus: 'Success'
        };

        axios.post('http://localhost:8989/api/order/create', updatedOrder)
            .then(response => {
                console.log("Order submitted successfully:", response.data);
                alert("Order submitted and payment successful!");
                window.location.reload();
            })
            .catch(error => {
                console.error("Error submitting order:", error);
                alert("Failed to submit order. Please try again.");
            });
    };

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    });

    return (
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
                justifyContent: 'center',
            }}
        >
            <div
                className="modal-content"
                ref={componentRef} // Set the ref here
                style={{
                    backgroundColor: '#fff',
                    padding: '20px',
                    borderRadius: '5px',
                    width: '80%',
                    maxHeight: '80%',
                    overflowY: 'auto',
                }}
            > <div ref={printRef} className='invoice-container'>
                    <div className="text-center">
                        <h1>Shop Name</h1>
                        <p>123 Main Street, City Name, State - Zip Code</p>
                        <p>Phone: +123 456 7890 | Email: shop@example.com</p>
                    </div>
                    <h3>Invoice</h3>
                    <p>
                        <strong>Customer:</strong> {newOrder.customerName}
                    </p>
                    <p style={{ textAlign: 'left' }}>Billing Date: {new Date().toLocaleString()}</p>
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
                    <h4>Total Amount: {newOrder.totalAmount}</h4> </div>


                <div className="d-flex justify-content-end">

                    <button
                        className="btn btn-secondary me-2"
                        onClick={onClose}
                    >
                        Close
                    </button>

                    <button className="btn btn-primary me-2" onClick={handlePaid}>
                        Paid
                    </button>

                    <button className="btn btn-success ms-2" onClick={handlePrint}>
                        Print Invoice
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvoicePopup;
