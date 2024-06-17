USE ToursAndTravel
GO

CREATE OR ALTER PROCEDURE getTour(
    @tour_Id VARCHAR(255)
)
AS
BEGIN
    SELECT 
        tour_Name, 
        tour_Destination, 
        tour_Description, 
        tour_Price
    FROM Tours 
    WHERE tour_Id = @tour_Id
END
