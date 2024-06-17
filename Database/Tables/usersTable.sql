CREATE DATABASE ToursAndTravel;

USE ToursAndTravel;

CREATE TABLE Users (
    user_Id VARCHAR(255) PRIMARY KEY,
    user_Name VARCHAR(255) NOT NULL,
    user_Email VARCHAR(255) NOT NULL UNIQUE,
    password_Hash VARCHAR(255) NOT NULL,
    isAdmin INT DEFAULT 0,
    isDeleted INT DEFAULT 0,
    isEmailSent INT DEFAULT 0
);

SELECT * FROM Users;

UPDATE Users SET isAdmin = 1 WHERE user_Email = 'admin@gmail.com';
