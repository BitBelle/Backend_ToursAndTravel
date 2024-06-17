USE ToursAndTravel
GO

CREATE OR ALTER PROCEDURE getHotel(
    @hotel_Id VARCHAR(255)
)
AS
BEGIN
    SELECT
        hotel_Name, 
        hotel_Location, 
        hotel_Rating
    FROM Hotels 
    WHERE hotel_Id = @hotel_Id
END
