CREATE DATABASE car_park;
use car_park;
CREATE TABLE parking_slots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slot_number VARCHAR(10) NOT NULL,
    occupied BOOLEAN DEFAULT FALSE,
    vehicle_number VARCHAR(20)
);