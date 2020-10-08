BEGIN;

TRUNCATE
  meals_table,
  users_table
  RESTART IDENTITY CASCADE;


INSERT INTO users_table (user_name, full_name, password)
VALUES
  ('dunder', 'Dunder Mifflin', '$2a$12$xYIP4P5G0G.jV47Ze9ZUN.U232wkVZillrTDXwD39J3Z/MVDaOTnW'),
  ('T.Mac', 'Theo McCauley', '$2a$12$4O.oitm3zAiDP8fVq6vK8uR0nFNGcR4PNR8cPiOpK7cktYrTuakPe'),
  ('C.choc', 'Charlie Chocolate', '$2a$12$5XQ64z3M56rZcSXa/yaWKeUedLbO15hgHp5FbMZpDj99DXmLE33Cm');

INSERT INTO meals_table (meal_title , user_id, calories, fats, carbs, protiens)
VALUES
('Popcorn', 2, 235, 12, 24, 4  ),
('Three Eggs', 2, 225, 15, 2.5, 21  ),
('Big Ham Sandwhich', 2, 409, 14, 47.7, 22.3);



COMMIT;