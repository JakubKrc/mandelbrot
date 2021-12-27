const express = require('express');      //toto sa teraz ucim, tu som daco vyskusal a zatial som spokojny.
const mysql = require('mysql');          //a ani som sa dako nesnazil ist cez typescript
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

app.use(cors({origin: '*'}));          //mam podozrenie ze totok sa pouziva ked ides z inej ip adresy mat daky request, 
                                        //mozno pri uploade to ani nebude treba. 
                                        //len tu idem z live server extensie(klient) do nodemon(server)


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
    db.query(sql, (err, result) => {   //tusim ze to app.use(express.json()); to automaticky parse/stringify 
        if(err) throw err;              //co ma trochu mrzuti je, ze bez toho to vobec neviem poslat, aj ked
        res.send(result);               //mu zadam context-type: text/plain, to to proste zostringyfajovany json
        console.log("data send from server")  //neposle ako string. ide to aj takto, len ma to iritovalo
    })

});

app.listen('3000', () => {
    console.log('Server started at port 3000.');
});