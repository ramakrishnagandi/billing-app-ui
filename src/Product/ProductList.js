import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newProduct, setNewProduct] = useState({
        productName: '', price: '',
        weight: 0, quantity: '', categoryId: ''
    });

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:8989/api/products');
        console.log(response.data);
        setProducts(response.data);
    };

    const fetchCategories = async () => {
        const response = await axios.get('http://localhost:8989/api/categories');
        setCategories(response.data);
    };

    const createProduct = async () => {
        console.log(newProduct);
        await axios.post('http://localhost:8989/api/products', newProduct);
        setNewProduct({ productName: '', price: '', weight: '', quantity: '', categoryId: '' });
        fetchProducts();
    };

    const deleteProduct = async (id) => {
        await axios.delete(`http://localhost:8989/api/products/${id}`);
        fetchProducts();
    };

    const handleInputChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    return (
        <div className="container">
            <h3>Add New Product</h3>
            <div className="input-group mb-3">
                <input type="text" className="form-control" name="productName" placeholder="Product Name"
                    value={newProduct.productName} onChange={handleInputChange} />
                <input type="text" className="form-control" name="price" placeholder="Price"
                    value={newProduct.price} onChange={handleInputChange} />
                <div>
                    <input type="text" className="form-control" name="weight" placeholder="Weight"
                        value={newProduct.weight} onChange={handleInputChange} />
                    <select name="unit" className="form-control" value={newProduct.unit}
                        onChange={handleInputChange} >
                        <option value="">Select Unit</option>
                        <option value="kg">KG</option>
                        <option value="gms">Grams</option>
                        <option value="ltr">Liters</option>
                        <option value="pc">Pc</option>
                    </select>
                </div>
                <input type="number" className="form-control" name="quantity" placeholder="Quantity"
                    value={newProduct.quantity} onChange={handleInputChange} />
                <select className="form-control" name="categoryId" value={newProduct.categoryId} onChange={handleInputChange}>
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category.categoryId} value={category.categoryId}>
                            {category.categoryName}
                        </option>
                    ))}
                </select>
                <button className="btn btn-primary" onClick={createProduct}>Add Product</button>
            </div>
            <h2>Products</h2>
            <table className="table border shadow">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Weight</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Category Name</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr>
                            <th scope="row" key={index}>
                                {index + 1}
                            </th>
                            <td>{product.productName}</td>
                            <td>{product.price}</td>
                            <td>{product.weight} {product.unit}</td>
                            <td>{product.quantity}</td>
                            <td>{product.categoryName}</td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(product.productId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
}

export default ProductList;
