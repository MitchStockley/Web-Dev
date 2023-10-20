//set up express web server

const express = require("express"); //express is for building rest apis
const bodyParser = require("body-parser"); //helps to parse the request and create the req.body object
const cors = require("cors");
const db = require("./models");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));


db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("connected to the database");
})
.catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});

//parse requests of content type - application json
app.use(bodyParser.json());

//parse requests of content type - application json
app.use(bodyParser.urlencoded({ extended: true}));

//simple route
app.get("/", (req,res) => {
    res.json({message: "Welsome to bezkoder application"});
});

 require("../Projects/routes/tutorial.routes")(app);
//set port and listen for requests
const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
});