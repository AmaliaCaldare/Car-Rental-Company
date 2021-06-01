CREATE VIEW customers AS 
SELECT first_name, last_name, phone_number, email 
 FROM users
 JOIN user_roles ON users.id = user_roles.role_id
 JOIN roles ON user_roles.role_id = roles.id 
 WHERE roles.name="CUSTOMER";