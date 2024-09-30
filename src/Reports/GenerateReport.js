import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Select from 'react-select'
import axios from 'axios';

export const GenerateReport = () => {
    const [customers, setCustomers] = useState([]);
    const [resp, setResponse] = useState([]);
    const [filters, setFilters] = useState({
        orderNumber: '',
        customerId: '',
        customerName: '',
        mobileNumber: '',
        startDate: '',
        endDate: ''
    });

    const [mobNum, setMobNum] = useState('');

    useEffect(() => {
        console.log("---------------------------------------------------", filters);
        fetchCustomers();
    }, [filters]);

    const fetchCustomers = async () => {
        const response = await axios.get('http://localhost:8989/api/customer/customers');
        setCustomers(response.data);
        console.log(">>>>>>>>>>>>>>>>", customers)
    };

    const customerOptions = customers.map(cust => ({

        value: cust.customerId,
        label: cust.firstName,
        mobile: cust.mobileNo
    }));

    const selectedCustomer = customers.find(
        option => option.value === filters.customerId
    );

    const handleCustomerChange = (selectedOption) => {
        setFilters(prevFilter => ({
            ...prevFilter,
            customerId: selectedOption.value,
            customerName: selectedOption.label
        }));
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters({
            ...filters,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(filters);

        axios.post('http://localhost:8989/api/order/filter', filters, {
            params: {
                page: 0,
                size: 10
            }
        })
            .then(response => {
                setResponse(response.data)
                console.log("Generated orders list:", response.data);
            })
            .catch(error => {
                console.error("Error submitting order:", error);
            });
    };

    return (
        <div className="container">
            <h4 className="text-primary ">Generate Report</h4>
            <Form onSubmit={handleSubmit}>
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

                    <input type="text" className="form-control"
                        name="mobileNumber"
                        placeholder="Mobile Number"
                        value={filters.mobileNumber}
                        onChange={handleInputChange} />
                    <div>
                        <h6>Start date</h6>
                        <input type="date" className="form-control"
                            name="startDate"
                            placeholder='Start date'
                            value={filters.startDate}
                            onChange={handleInputChange} >
                        </input>
                    </div>

                    <div>
                        <h6>End date</h6>
                        <input type="date" className="form-control"
                            name="endDate"
                            placeholder='Start date'
                            value={filters.endDate}
                            onChange={handleInputChange} >
                        </input>
                    </div>

                </div>
                <div className="input-group mb-3 shadow-grey">
                    <input type="text" className="form-control"
                        name="orderNumber"
                        placeholder="Order Number"
                        value={filters.orderNumber}
                        onChange={handleInputChange} />
                </div>

                <Button variant="primary" type="submit">
                    Generate Report
                </Button>
            </Form>

            <div>
                <table className="table border shadow-grey ">
                    <thead>
                        <tr>
                            <th scope="col" className="table-header">Order Number</th>
                            <th scope="col" className="table-header">Customer Name</th>
                            <th scope="col" className="table-header">Mobile Number</th>
                            <th scope="col" className="table-header">Total Items</th>
                            <th scope="col" className="table-header">Total Amount</th>
                            <th scope="col" className="table-header">Orderd Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resp.map((response, index) => (
                            <tr>
                                <td>{response.orderId}</td>
                                <td>{response.customerName}</td>
                                <td>{response.mobileNo}</td>
                                <td>{response.totalItems}</td>
                                <td>{response.totalAmount}</td>
                                <td>{response.orderDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default GenerateReport;