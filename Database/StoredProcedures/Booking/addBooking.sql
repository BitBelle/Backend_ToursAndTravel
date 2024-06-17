USE ToursAndTravel

GO

CREATE OR ALTER PROCEDURE addBooking(
    @booking_Id VARCHAR(255),
    @user_Id VARCHAR(255),
    @tour_Id VARCHAR(255),
    @hotel_Id VARCHAR(255),
    @booking_Date DATE
)

AS
BEGIN

    INSERT INTO Bookings(booking_Id, user_Id, tour_Id, hotel_Id, booking_Date)
    VALUES(@booking_Id, @user_Id, @tour_Id, @hotel_Id, @booking_Date)

END