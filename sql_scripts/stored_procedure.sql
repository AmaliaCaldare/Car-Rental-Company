
DELIMITER $$

CREATE PROCEDURE `GetRentalInfo` (IN `rentalId` INT)  NO SQL
SELECT users.first_name, users.last_name, users.email, rentals.rental_start, rentals.rental_end, vehicles.brand, vehicles.model, vehicles.number_plate, contact_info.phone_number, contact_info.email as company_email, contact_info.opening_time, contact_info.closing_time, addresses.street_name, addresses.street_number, addresses.city, addresses.country, addresses.postal_code 
FROM users INNER JOIN rentals ON users.id = rentals.user_id 
INNER JOIN vehicles ON rentals.vehicle_id = vehicle.id 
INNER JOIN rental_points ON vehicles.rental_point_id = rental_point.id 
INNER JOIN contact_info ON rental_point.contact_info_id = contact_info.id 
INNER JOIN addresses ON rental_point.address_id = address.id
 WHERE rental.id=rentalId$$

DELIMITER ;