CREATE TABLE "Koalas" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(80) NOT NULL,
    "age" INTEGER,
    "gender" VARCHAR(80) NOT NULL,
    "ready_to_transfer" VARCHAR(80) NOT NULL,
    "notes" VARCHAR(80) NOT NULL
);

INSERT INTO "Koalas" 
	("name", "age", "gender", "ready_to_transfer", "notes") 
VALUES 
	('Scotty', 4, 'M', 'Y', 'Born in Guatemala'),
	('Jean', 5, 'F', 'Y', 'Allergic to lots of lava'),
	('Ororo', 7, 'F', 'N', 'Loves listening to Paula (Abdul)'),
	('Logan', 15, 'M', 'N', 'Loves the sauna'),
	('Charlie', 9, 'M', 'Y', 'Favorite band is Nirvana'),
	('Betsy', 4, 'F','Y', 'Has a pet iguana');