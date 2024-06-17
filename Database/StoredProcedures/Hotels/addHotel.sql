USE ToursAndTravel

GO

CREATE OR ALTER PROCEDURE addHotel(
    @hotel_Id VARCHAR(255),
    @hotel_Name VARCHAR(255),
    @hotel_Location VARCHAR(255),
    @hotel_Rating VARCHAR(255)
)

AS
BEGIN

    INSERT INTO Hotels(hotel_Id, hotel_Name, hotel_Location, hotel_Rating)
    VALUES(@hotel_Id, @hotel_Name, @hotel_Location, @hotel_Rating)

END