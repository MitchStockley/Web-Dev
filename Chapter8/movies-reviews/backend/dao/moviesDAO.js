let movies; //stores reference to the database. 

export default class MoviesDAO {
    static async injectDB(conn) { //injectDB is called as soon as the server starts and provides the database reference to movie
        if (movies) {
            return
        }
        try {
            movies = await conn.db(process.env.MOVIEREVIEWS_NS).collection('movies')
        }
        catch (e) {
            console.log('unable to connect in MoviesDAO: ${e}')
        }
    }
    static async getMovies({// default filter
        filters = null,
        page = 0,
        moviesPerPage = 20, // will only get 20 movies at once
    } = {}) {
        let query //query variable which will be empty unless a user specifies filters in his retrieval
        if (filters) {
            if ("title" in filters) {
                query = { $text: { $search: filters['title'] } } //checking if user has requested a title
            } else if ("rated" in filters) {
                query = { "rated": { $eq: filters['rated'] } } //check if they have requested a rating
            }
        } //find all movies that fit our quary and assigns it to curser
        let cursor //cursers are used to fetch large docs and fetchs in batches to be more efficient
        try {
            cursor = await movies
                .find(query)
                .limit(moviesPerPage) //caps number of documents as specified in the moviesPerPage variable
                .skip(moviesPerPage * page) //limit only comes into the feect after the user clicks next page etc..
            //we get the total amount of movies by counting the num of docs in quary and return MoviesList and TotalNumMovies in an object
            const moviesList = await cursor.toArray()
            const totalNumMovies = await movies.countDocuments(query)
            return { moviesList, totalNumMovies }
        }
        catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { moviesList: [], totalNumMovies: 0 }
        }
    }
}