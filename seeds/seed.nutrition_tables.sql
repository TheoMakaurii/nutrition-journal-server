BEGIN;

TRUNCATE
  meals_table,
  users_table
  RESTART IDENTITY CASCADE;


INSERT INTO users_table (user_name, full_name, password)
VALUES
  ('dunder', 'Dunder Mifflin', 'password'),
  ('T.Mac', 'Theo McCauley', 'passwort'),
  ('C.choc', 'Charlie Chocolate', 'passworc');

INSERT INTO meals_table (meal_title , user_id, calories, fats, carbs, protiens)
VALUES
('Popcorn', 2, 235, 12, 24, 4  ),
('Three Eggs', 2, 225, 15, 2.5, 21  ),
('Big Ham Sandwhich', 2, 409, 14, 47.7, 22.3);



COMMIT;