USE ToursAndTravel

GO


CREATE OR ALTER PROCEDURE updateHotel(
    @hotel_Id VARCHAR(255), 
    @hotel_Name VARCHAR(255), 
    @hotel_Location VARCHAR(255), 
    @hotel_Rating VARCHAR(255)
    )

AS
BEGIN

UPDATE Hotels 
SET hotel_Id = @hotel_Id, 
    hotel_Name = @hotel_Name,
    hotel_Location = @hotel_Location,
    hotel_Rating = @hotel_Rating
    
WHERE hotel_Id = @hotel_Id

END 