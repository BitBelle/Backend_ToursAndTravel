USE ToursAndTravel
GO

CREATE OR ALTER PROCEDURE getUser(
    @user_Name VARCHAR(255),
    @user_Email VARCHAR(255)
)
AS
BEGIN
    SELECT * FROM Users 
    WHERE user_Name = @user_Name
    OR user_Email = @user_Email
END
