USE ToursAndTravel
GO

CREATE OR ALTER PROCEDURE deleteTour(
    @tour_Id VARCHAR(255)
)
AS
BEGIN
    UPDATE Tours
    SET isDeleted = 1
    WHERE tour_Id = @tour_Id;
END
