import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Modal, Button, Form } from 'react-bootstrap';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Sales = ({ Toggle }) => {
    const [sales, setSales] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        productName: '',
        quantitySold: '',
        unitPrice: '',
        totalPrice: '',
        customerName: '',
        saleDate: new Date().toISOString().slice(0, 10)
    });

    useEffect(() => {
        fetchSales();
    }, []);

    const fetchSales = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/sales/sales'); // Use GET request to fetch data
            setSales(response.data);
        } catch (error) {
            console.error('Error fetching sales:', error);
        }
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({
            productName: '',
            quantitySold: '',
            unitPrice: '',
            totalPrice: '',
            customerName: '',
            saleDate: new Date().toISOString().slice(0, 10)
        });
        fetchSales(); // Refetch sales data after closing modal
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            await axios.post('http://localhost:8080/api/v1/sales/sales', formData); // Submit form data
            fetchSales(); // Refetch sales data after successful submission
            setShowModal(false); // Close modal after successful submission
            setFormData({  // Clear form data after successful submission
                productName: '',
                quantitySold: '',
                unitPrice: '',
                totalPrice: '',
                customerName: '',
                saleDate: new Date().toISOString().slice(0, 10)
            });
        } catch (error) {
            console.error('Error adding sale to database:', error);
        }
    };


    return (
        <>
            <div className="main-content container-fluid px-4">
                <div className="row mt-4">
                    <div className="col">
                        {/* <h2>Inventory</h2> */}
                        <table className="table table-hover table-bordered text-center">
                            <thead className='table-info'>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Quantity Sold</th>
                                    <th>Unit Price</th>
                                    <th>Total Price</th>
                                    <th>Customer Name</th>
                                    <th>Sale Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sales.map((sale, index) => (
                                    <tr key={index}>
                                        <td>{sale.productName}</td>
                                        <td>{sale.quantitySold}</td>
                                        <td>{sale.unitPrice}</td>
                                        <td>{sale.totalPrice}</td>
                                        <td>{sale.customerName}</td>
                                        <td>{new Date(sale.saleDate).toLocaleDateString()}</td>
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
                <Button variant="info border-rounded" onClick={handleOpenModal}>
                    Add Sale
                </Button>
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Sale</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="productName">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control type="text" name="productName" value={formData.productName} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="quantitySold">
                                <Form.Label>Quantity Sold</Form.Label>
                                <Form.Control type="number" name="quantitySold" value={formData.quantitySold} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="unitPrice">
                                <Form.Label>Unit Price</Form.Label>
                                <Form.Control type="number" name="unitPrice" value={formData.unitPrice} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="totalPrice">
                                <Form.Label>Total Price</Form.Label>
                                <Form.Control type="number" name="totalPrice" value={formData.totalPrice} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="customerName">
                                <Form.Label>Customer Name</Form.Label>
                                <Form.Control type="text" name="customerName" value={formData.customerName} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="saleDate">
                                <Form.Label>Sale Date</Form.Label>
                                <Form.Control type="date" name="saleDate" value={formData.saleDate} onChange={handleChange} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="info" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                        <Button variant="info" onClick={handleSubmit}>
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default Sales;
