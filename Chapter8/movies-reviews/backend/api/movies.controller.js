// //creating the movies controller

// import MoviesDAO from "../dao/moviesDAO"; //import the DAO

// export default class MoviesController {

//     static async apiGetMovies(req, res, next) { //when api getmovies is called via a url, there will be a query string in the response object(req.query) 
//         const moviesPerPage = req.query.moviesPerPage ? //check if movies per page exists, parse into an interger
//             parseInt(req.query.moviesPerPage) : 20
//         const page = req.query.page ? parseInt(req.query.page) : 0

//         let filters = {}; //start with an empty filters object
//         //check if rate and title query exist then we add to the filters object
//         if (req.query.rated) {
//             filters.rated = req.query.rated
//         }
//         else if (req.query.title) {
//             filters.title = req.query.title
//         }

//         const { moviesList, totalNumMovies } = await
//             MoviesDAO.getMovies({ filters, page, moviesPerPage }) //call getmoviesDao
//         let response = {
//             movies: moviesList,
//             page: page,
//             filters: filters,
//             entries_per_page: moviesPerPage,
//             total_results: totalNumMovies,
//         }

//         res.json(response) //we then send a json response with the above response object to whoever calls this url
//     }
// }

import MoviesDAO from "../dao/moviesDAO.js";

export default class MoviesController {

    static async apiGetMovies(req, res, next) {
        const moviesPerPage = req.query.moviesPerPage
            ? parseInt(req.query.moviesPerPage)
            : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;

        let filters = {};
        if (req.query.rated) {
            filters.rated = req.query.rated;
        } else if (req.query.title) {
            filters.title = req.query.title;
        }

        const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({
            filters,
            page,
            moviesPerPage,
        });

        let response = {
            movies: moviesList,
            page: page,
            filters: filters,
            entries_per_page: moviesPerPage,
            total_results: totalNumMovies,
        };
        res.json(response);
    }
}