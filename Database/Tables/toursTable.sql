CREATE DATABASE ToursAndTravel;

USE ToursAndTravel;

CREATE TABLE Tours (
    tour_Id VARCHAR(255) PRIMARY KEY,
    tour_Name VARCHAR(255) NOT NULL,
    tour_Destination VARCHAR(255) NOT NULL,
    tour_Description TEXT,
    tour_Price DECIMAL(10, 2) NOT NULL
);


ALTER TABLE Tours ADD isDeleted INT DEFAULT 0;

SELECT * FROM Tours;
