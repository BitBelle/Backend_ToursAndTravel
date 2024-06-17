USE ToursAndTravel

GO

CREATE OR ALTER PROCEDURE deleteBooking (
    @booking_Id VARCHAR(255), 
    @user_Id VARCHAR(255), 
    @hotel_Id VARCHAR(255), 
    @booking_Date DATE
    )
AS
BEGIN

UPDATE Bookings
    SET isDeleted = 1
    WHERE booking_Id = @booking_Id;

END