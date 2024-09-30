import axios from "axios";
import authHeader from "../Auth/AuthHeader";

const API_URL = "http://localhost:8989/";

const getAllCategories = () => {
    return axios.get(API_URL + "api/categories",
        {
            headers: authHeader()
        });
};

const createCategory = (categoryName) => {
    return axios.post(API_URL + "api/categories", { categoryName },
        {
            headers: authHeader()
        });
}

const deleteCategory = (id) => {
    return axios.delete(API_URL + `api/categories/${id}`,
        {
            headers: authHeader()
        });
}

const categoryService = {
    getAllCategories,
    createCategory,
    deleteCategory,

};

export default categoryService;