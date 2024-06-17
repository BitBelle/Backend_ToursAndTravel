USE ToursAndTravel

GO

CREATE OR ALTER PROCEDURE registerUser( 
    @user_Id VARCHAR(255),
    @user_Name VARCHAR(255),
    @user_Email VARCHAR(255),
    @password_Hash VARCHAR(255)
)

AS 
BEGIN

INSERT INTO Users(user_Id, user_Name, user_Email, password_Hash)
VALUES(@user_Id, @user_Name, @user_Email, @password_Hash)

END