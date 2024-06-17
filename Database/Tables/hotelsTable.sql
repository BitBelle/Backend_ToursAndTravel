USE ToursAndTravel


CREATE TABLE Hotels(
    hotel_Id VARCHAR(255) PRIMARY KEY,
    hotel_Name VARCHAR(255) NOT NULL,
    hotel_Location VARCHAR(255) NOT NULL,
    hotel_Rating VARCHAR(50) NOT NULL
);

ALTER TABLE Hotels ADD isDeleted INT DEFAULT 0;

SELECT * FROM Hotels