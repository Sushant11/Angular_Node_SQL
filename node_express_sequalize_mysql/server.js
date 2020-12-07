const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

let corsOptions = {
    origin: 'http://localhost:8080'
}

app.use(cors(corsOptions));

//parse requests of content-type - application/json
app.use(bodyParser.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

const db = require('./app/models')
db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and re-sync db.');
});

//simple route for testing
// app.get('/', (req, res) => {
//     res.json({ message: 'Welcome to node server.' })
// })

// app.post('/test', (req, res) => {
//     console.log('req.body :>> ', req.body);
//     res.json({ requestBody: req.body })
// })

require('./app/routes/tutorial.routes')(app);

const PORT = process.env.port || 8080

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
