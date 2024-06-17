USE ToursAndTravel

CREATE TABLE Bookings (
    booking_Id VARCHAR(255) PRIMARY KEY,
    user_Id VARCHAR(255),
    tour_Id VARCHAR(255),
    hotel_Id VARCHAR(255),
    booking_Date DATE NOT NULL,
    FOREIGN KEY (user_Id) REFERENCES Users(user_Id),
    FOREIGN KEY (tour_Id) REFERENCES Tours(tour_Id),
    FOREIGN KEY (hotel_Id) REFERENCES Hotels(hotel_Id)
);

DROP TABLE Bookings;

SELECT * FROM Bookings;

ALTER TABLE Bookings ADD isDeleted INT DEFAULT 0;