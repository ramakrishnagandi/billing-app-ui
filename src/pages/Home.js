import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import authService from "../Auth/AuthService";


export default function Home() {
    const navigate = useNavigate();
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = window.localStorage.getItem("isLoggedIn");
    const userType = window.localStorage.getItem("role");

    const [users, setUsers] = useState([]);
    useEffect(() => {
        if (userType === 'admin' || userType === 'manager') {
            loadUsers();
        }
    }, []);

    const loadUsers = async () => {
        authService.getAllUsers().then(
            (response) => {
                console.log(response.data);
                setUsers(response.data);
            },
            (error) => {
                console.log("Private page", error.response);
                // Invalid token
                if (error.response && error.response.status === 403) {
                    authService.logout();
                    navigate("/login");
                    window.location.reload();
                }
            }
        );
    }

    const deleteUser = async (id) => {
        authService.deleteUser(id).then(
            () => {
                loadUsers();
            }
        )
    };

    return (
        <div className="container">
            {
                userType === "admin" || userType === "manager" ? (
                    <div className="py-4">
                        <table className="table border shadow">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr>
                                        <th scope="row" key={index}>
                                            {index + 1}
                                        </th>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <Link
                                                className="btn btn-primary mx-2"
                                                to={`/viewuser/${user.id}`}
                                            >
                                                View
                                            </Link>
                                            <Link
                                                className="btn btn-outline-primary mx-2"
                                                to={`/updateUser/${user.id}`}
                                            >
                                                Update
                                            </Link>
                                            <button className="btn btn-danger max-2"
                                                onClick={() => deleteUser(user.id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>

                ) : <></>
            }
        </div >
    );
}