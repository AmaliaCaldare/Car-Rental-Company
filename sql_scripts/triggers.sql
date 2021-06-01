AFTER INSERT ON rentals
FOR EACH ROW

    INSERT INTO rentals_audits(
        rental_id, rental_start, rental_end, final_price, user_id,vehicle_id,
        created_at, created_by
        ) VALUES (NEW.id, NEW.rental_start, NEW.rental_end, NEW.final_price, NEW.user_id,NEW.vehicle_id,
        now(), created_by);

DELIMITER //
CREATE TRIGGER vehicle_price_check 
BEFORE INSERT
ON
	vehicles FOR EACH ROW
BEGIN
	IF NEW.price < 0 THEN
    SET NEW.price = 0;
	END IF;
END //

DELIMITER //
CREATE EVENT IF NOT EXISTS delete_old_rentals
ON SCHEDULE EVERY 2 YEAR
STARTS CURRENT_TIMESTAMP
ENDS CURRENT_TIMESTAMP + INTERVAL 10 YEAR
DO BEGIN
	DELETE FROM rental
    WHERE rental_end < now() - INTERVAL 2 year;
END //