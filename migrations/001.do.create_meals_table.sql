CREATE TABLE meals_table (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    meal_title TEXT NOT NULL,
    calories INTEGER NOT NULL,
    fats INTEGER,
    carbs INTEGER,
    protiens INTEGER,
    date_published TIMESTAMPTZ DEFAULT now() NOT NULL

);
