
USE ToursAndTravel

GO

CREATE OR ALTER PROCEDURE getBooking(
    @booking_Id VARCHAR(255), 
    @user_Id VARCHAR(255), 
    @hotel_Id VARCHAR(255), 
    @booking_Date DATE
    )

AS

BEGIN

SELECT * FROM Bookings 
WHERE booking_Id = @booking_Id

END