// Database (Koala_Holla_Web_App) Connection
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all koalas from the database
router.get('/', (req, res) => {
  // write SQL query and save that in a variable
  const queryText = 'SELECT * FROM "KoalasWebApp";';
  // send SQL query to the database using pool.query
  pool.query(queryText)
    // best practice is to use the word 'result' to describe
    // what we get back from the Koala_Holla database
    .then((result) => {
      console.log('result is:', result);
      // result.rows is where the data we requested is
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error making query:', error);
      res.sendStatus(500);
    });
}); // end GET all koalas from the database




// GET specific koala by ID
  // id is a route parameter
    // we use this parameter to identify
    // that we want this specific identified part of the request
router.get('/:id', (req, res) => {
  // assign req.params.id to a variable
  // write a SQL query that gets back the koala with the
    // specified (parameter) id
  const idToGet = req.params.id;

  const query = 'SELECT * FROM "KoalasWebApp" WHERE id = $1;';
  // use pool.query to access pool 
    // (group of connections between server and database)
  pool.query(query, [idToGet])
    // .then because query is asynchronous
    .then((result) => {
      console.log(`Koala with id of ${idToGet}:`, result.rows);
      // result.rows is where the desired part of the
        // result/response is
        // send data back to client
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error making database query:', error);
      res.sendStatus(500);
    });
}); // end GET specific koala by ID



// POST a new koala
router.post('/', (req, res) => {
  const newKoala = req.body;
  console.log('Adding koala', newKoala);
  // Insert and use parameterization for POST
  const queryText = `INSERT INTO "KoalasWebApp" ("name", "age", "gender", "ready_to_transfer", "notes")
                     VALUES ($1, $2, $3, $4, $5);`;

  const koalaParams = [
    newKoala.name,
    newKoala.age,
    newKoala.gender,
    newKoala.ready_to_transfer,
    newKoala.notes,
  ];

  // Use the Query and Pool
  pool.query(queryText, koalaParams)
    // Get the result of query
    .then((result) => {
      //  Send an Ok - Status
      res.sendStatus(201);
    })
    // Catch any errors that occur
    .catch((error) => {
      console.log('Error making database query:', error);
      res.sendStatus(500);
    });
}); // end POST a new koala



// PUT koala ready_to_transfer value to 'Y' for a specific ID
router.put('/:id', (req, res) => {
  const idToUpdate = req.params.id;
  const query = `UPDATE "KoalasWebApp" SET "ready_to_transfer" = 'Y' WHERE "id" = $1;`;

  pool
    .query(query, [idToUpdate])
    .then((result) => {
      console.log('Koala is ready to transfer!', result);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error changing Koala transfer status:', error);
      res.sendStatus(500);
    });
});

// DELETE a koala by ID
router.delete('/:id', (req, res) => {
  const idToDelete = req.params.id;
  // Use query parameterization to protect the 
    // database from SQL injection
  const query = `DELETE FROM "KoalasWebApp" WHERE "id" = $1`;

  // Connect/talk with the database and run the query
  pool.query(query, [idToDelete])
    .then((result) => {
      console.log('Koala deleted');
      // Send status 200 or 'ok' to the client
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error making database query:', error);
      // Send status code 500 or 'internal server error'
      res.sendStatus(500);
    });
});

module.exports = router;

