USE ToursAndTravel
GO

CREATE OR ALTER PROCEDURE updateTour(
    @tour_Id VARCHAR(255), 
    @tour_Name VARCHAR(255), 
    @tour_Destination VARCHAR(255), 
    @tour_Description VARCHAR(255), 
    @tour_Price DECIMAL(10,2)
)
AS
BEGIN
    UPDATE Tours 
    SET 
        tour_Name = @tour_Name,
        tour_Destination = @tour_Destination,
        tour_Description = @tour_Description, 
        tour_Price = @tour_Price
    WHERE 
        tour_Id = @tour_Id
END
