USE ToursAndTravel
GO

CREATE OR ALTER PROCEDURE deleteHotel(
    @hotel_Id VARCHAR(255)
)
AS
BEGIN

    UPDATE Hotels
    SET isDeleted = 1
    WHERE hotel_Id = @hotel_Id;
END
