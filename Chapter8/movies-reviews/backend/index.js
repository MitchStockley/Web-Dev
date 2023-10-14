import app from './server.js';
import mongodb from "mongodb";
import dotenv from "dotenv";
import MoviesDAO from './dao/moviesDAO.js';

async function main() {
    dotenv.config(); //load in the environment variables
    //create an instance of Mongo Client and pass in the data URI
    const client = new mongodb.MongoClient(
        process.env.MOVIEREVIEWS_DB_URI);

    const port = process.env.PORT || 8000; //if cant access port it uses 8000

    try {
        //await connection to the MOngo cluster
        await client.connect(); //returns a promise //await is used to indicate that we block further execution untill completion 
        await MoviesDAO.injectDB(client); //right after we connect to the database and just before we connect to the server we call inject to get our annitial reference to the movies collection in the database.
        //start server if no errors 
        app.listen(port, () => {
            console.log('Server is running and listening on port: ' + port);
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

main().catch(console.error);