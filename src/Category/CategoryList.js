import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const response = await axios.get('http://localhost:8989/api/categories');
        setCategories(response.data);
    };

    const createCategory = async () => {
        await axios.post('http://localhost:8989/api/categories', { categoryName });
        setCategoryName('');
        fetchCategories();
    };

    const deleteCategory = async (id) => {
        await axios.delete(`http://localhost:8989/api/categories/${id}`);
        fetchCategories();
    };

    return (
        <div className="container">
            <h2>Categories</h2>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Category Name"
                    value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                <button className="btn btn-primary" onClick={createCategory}>Add Category</button>
            </div>
            <ul className="list-group mb-3">
                {categories.map(category => (
                    <li key={category.categoryId} className="list-group-item d-flex justify-content-between align-items-center">
                        {category.categoryName}
                        <button className="btn btn-danger btn-sm" onClick={() => deleteCategory(category.categoryId)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryList;
