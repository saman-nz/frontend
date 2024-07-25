import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import Sidebar from '../components/Sidebar';

const Purchase = () => {
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        fetchPurchases();
    }, []);

    const fetchPurchases = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/purchase/purchases');
            if (!response.ok) {
                throw new Error('Failed to fetch purchases');
            }
            const data = await response.json();
            // Format the expireDate to YYYY-MM-DD
            const formattedData = data.map(purchase => ({
                ...purchase,
                expireDate: new Date(purchase.expireDate).toISOString().split('T')[0]
            }));
            setPurchases(formattedData); // Set the state once with the formatted data
        } catch (error) {
            console.error('Error fetching purchases:', error);
        }
    };


    return (
        <>
            <div className="main-content container-fluid px-4">
                <div className="row mt-4">
                    <div className="col">
                        <table className="table table-hover table-bordered text-center">
                            <thead className='table-info'>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Category</th>
                                    <th>Quantity</th>
                                    <th>Supplier</th>
                                    <th>Total Price</th>
                                    <th>Expire Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {purchases.map((purchase, index) => (
                                    <tr key={index}>
                                        <td>{purchase.productName}</td>
                                        <td>{purchase.category}</td>
                                        <td>{purchase.quantity}</td>
                                        <td>{purchase.supplier}</td>
                                        <td>{purchase.costPrice}</td>
                                        <td>{purchase.expireDate}</td>
                                        <td>
                                            <Button variant="light" className='btn-sm'>
                                                <BsPencilSquare />
                                            </Button>
                                            <Button variant="light" className='btn-sm'>
                                                <BsTrash />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        
        </>
    );
};

export default Purchase;
