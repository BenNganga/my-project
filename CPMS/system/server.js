// Backend - Node.js + Express (server.js)
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'car_park'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to database');
    }
});

// API Routes
app.get('/slots', (req, res) => {
    db.query('SELECT * FROM parking_slots', (err, results) => {
        if (err) res.status(500).json(err);
        else res.json(results);
    });
});

app.post('/park', (req, res) => {
    const { slot_id, vehicle_number } = req.body;
    db.query('UPDATE parking_slots SET occupied = 1, vehicle_number = ? WHERE id = ?', 
    [vehicle_number, slot_id], (err, result) => {
        if (err) res.status(500).json(err);
        else res.json({ success: true });
    });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});

// Database Schema (MySQL)
/*
CREATE DATABASE car_park;
USE car_park;

CREATE TABLE parking_slots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slot_number VARCHAR(10) NOT NULL,
    occupied BOOLEAN DEFAULT FALSE,
    vehicle_number VARCHAR(20)
);
*/

// Front-End (React Component - Parking.js)
import { useEffect, useState } from 'react';

export default function Parking() {
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/slots')
            .then(res => res.json())
            .then(data => setSlots(data));
    }, []);

    return (
        <div>
            <h2>Car Park Management</h2>
            <ul>
                {slots.map(slot => (
                    <li key={slot.id}>{slot.slot_number} - {slot.occupied ? 'Occupied' : 'Available'}</li>
                ))}
            </ul>
        </div>
    );
}
