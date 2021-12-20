const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'game'
});

db.connect ((err) => {
    if(err)
        throw err;
    console.log('Database connected!');
})

const app = express();

app.use(cors({origin: '*'}));

app.use(express.json());

app.post('/sendLevelData', (req, res) => {

    let sql = `UPDATE episode SET Objects = '${req.body.Objects}', Events = '${req.body.Events}' WHERE Name = 'SKUSKA'`;
    db.query(sql, (err) => {
        if(err) throw err;
        console.log("level saved to server")
    })

});

app.get('/getLevelData', (req,res) => {

    let sql = `SELECT Objects, Events FROM episode WHERE Name = 'SKUSKA'`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
        console.log("data send from server")
    })

});

app.listen('3000', () => {
    console.log('Server started at port 3000.');
});