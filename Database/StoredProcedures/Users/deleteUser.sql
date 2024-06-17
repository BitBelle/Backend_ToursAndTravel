USE ToursAndTravel

GO

CREATE OR ALTER PROCEDURE deleteUser (
    @user_Id VARCHAR(255)
  
)
AS
BEGIN
    --soft delete by setting is_deleted to 1
    UPDATE Users
    SET isDeleted = 1
    WHERE user_Id = @user_Id;
END
