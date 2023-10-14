import app from './server.js';
import mongodb from "mongodb";
import dotenv from "dotenv";

async function main() {
    dotenv.config(); //load in the environment variables
    //create an instance of Mongo Client and pass in the data URI
    const client = new mongodb.MongoClient(
        process.env.MOVIEREVIEWS_DB_URI);

    const port = process.env.PORT || 8000; //if cant access port it uses 8000

    try {
        //await connection to the MOngo cluster
        await client.connect(); //returns a promise //await is used to indicate that we block further execution untill completion 
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