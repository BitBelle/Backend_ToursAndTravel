USE ToursAndTravel

GO

CREATE OR ALTER PROCEDURE addTour(
    @tour_Id VARCHAR(255),
    @tour_Name VARCHAR(255),
    @tour_Destination VARCHAR(255),
    @tour_Description VARCHAR(255),
    @tour_Price DECIMAL (10, 2)
)

AS
BEGIN

    INSERT INTO Tours (tour_Id, tour_Name, tour_Destination, tour_Description, tour_Price)
    VALUES(@tour_Id, @tour_Name, @tour_Destination, @tour_Description, @tour_Price)

END