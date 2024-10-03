import React, { useState } from 'react';
import axios from 'axios';

function AddCustomerForm() {
    const [newCustomer, setNewCustomer] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNo: '',
        addressLine: '',
        city: '',
        state: '',
        country: '',
        postelCode: ''
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCustomer(prevCustomer => ({
            ...prevCustomer,
            [name]: value
        }));

        // Clear the relevant error message if the input is valid
        if (name === 'firstName' && value.trim() !== '') {
            setErrors(prevErrors => ({ ...prevErrors, firstName: '' }));
        }

        if (name === 'email') {
            // Check email format
            if (value.trim() === '') {
                setErrors(prevErrors => ({ ...prevErrors, email: 'Email is required' }));
            } else if (!/\S+@\S+\.\S+/.test(value)) {
                setErrors(prevErrors => ({ ...prevErrors, email: 'Email format is invalid' }));
            } else {
                setErrors(prevErrors => ({ ...prevErrors, email: '' })); // Clear error if valid
            }
        }

        if (name === 'mobileNo') {
            // Check mobile number format
            if (value.trim() === '') {
                setErrors(prevErrors => ({ ...prevErrors, mobileNo: 'Mobile Number is required' }));
            } else if (!/^\d{10}$/.test(value)) {
                setErrors(prevErrors => ({ ...prevErrors, mobileNo: 'Mobile Number must be 10 digits' }));
            } else {
                setErrors(prevErrors => ({ ...prevErrors, mobileNo: '' })); // Clear error if valid
            }
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!newCustomer.firstName) {
            errors.firstName = 'First Name is required';
        }

        if (!newCustomer.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(newCustomer.email)) {
            errors.email = 'Email format is invalid';
        }

        if (!newCustomer.mobileNo) {
            errors.mobileNo = 'Mobile Number is required';
        } else if (!/^\d{10}$/.test(newCustomer.mobileNo)) {
            errors.mobileNo = 'Mobile Number must be 10 digits';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0; // Returns true if no errors
    };

    const handleAddCustomer = async () => {
        console.log(newCustomer);
        if (validateForm()) {
            try {
                const response = await axios.post('http://localhost:8989/api/customer/create', newCustomer);
                console.log("Customer added successfully", response);
                if (response.status === 208) {
                    setErrors(prevErrors => ({ ...prevErrors, mobileNo: response.data.error }));
                } else {
                    setNewCustomer({
                        firstName: '',
                        lastName: '',
                        email: '',
                        mobileNo: '',
                        addressLine: '',
                        city: '',
                        state: '',
                        country: '',
                        postelCode: ''
                    });
                    setErrors({});
                }

            } catch (error) {
                console.error("Error adding customer", error);
            }
        }

    };

    return (
        <div className="container">
            <h3>Add New Customer</h3>

            {/* Customer Form */}
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    placeholder="First Name"
                    value={newCustomer.firstName}
                    onChange={handleInputChange}
                />
                {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    placeholder="Last Name"
                    value={newCustomer.lastName}
                    onChange={handleInputChange}
                />
            </div>

            <div className="input-group mb-3">
                <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Email"
                    value={newCustomer.email}
                    onChange={handleInputChange}
                />
                {errors.email && <span className="text-danger">{errors.email}</span>}
                <input
                    type="text"
                    className="form-control"
                    name="mobileNo"
                    placeholder="Mobile Number"
                    value={newCustomer.mobileNo}
                    onChange={handleInputChange}
                />
                {errors.mobileNo && <span className="text-danger">{errors.mobileNo}</span>}
            </div>

            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    name="addressLine"
                    placeholder="Address Line"
                    value={newCustomer.addressLine}
                    onChange={handleInputChange}
                />
            </div>

            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    name="city"
                    placeholder="City"
                    value={newCustomer.city}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    className="form-control"
                    name="state"
                    placeholder="State"
                    value={newCustomer.state}
                    onChange={handleInputChange}
                />
            </div>

            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    name="country"
                    placeholder="Country"
                    value={newCustomer.country}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    className="form-control"
                    name="postelCode"
                    placeholder="Postal Code"
                    value={newCustomer.postelCode}
                    onChange={handleInputChange}
                />
            </div>

            <button type="button" className="btn btn-primary mb-3" onClick={handleAddCustomer}>
                Add Customer
            </button>
        </div>
    );
}

export default AddCustomerForm;
