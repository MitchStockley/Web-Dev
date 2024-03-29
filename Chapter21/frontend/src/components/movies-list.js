import React, { useState, useEffect } from 'react';
import MovieDataService from "../services/movies";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

//import usestate to create a series of state variables
//movies list is a functionall component and uses and receives props
//we use react use state hook to create the movies,searchTitle and searchRating and ratings.
const MoviesList = props => {
    const [movies, setMovies] = useState([])
    const [searchTitle, setSearchTitle] = useState("")
    const [searchRating, setSearchRating] = useState("")
    const [ratings, setRatings] = useState(["All Ratings"])

    //the useEffect hook is called after the component renders
    //we want to retrieve movies and ratings when component renders
    useEffect(() => {
        retrieveMovies()
        retrieveRatings()
    }, []) //empty array in second argument so that useEffect is only called on the components first render and not on every render of the component

    const retrieveMovies = () => {
        MovieDataService.getAll() //returns a promise with the movies retrived from the database
            .then(response => {
                console.log(response.data)
                setMovies(response.data.movies)//set it to the movies state variable. 
            })
            .catch(e => {
                console.log(e)
            })
    }
    const retrieveRatings = () => {
        MovieDataService.getRatings() //returns list of ratings
            .then(response => {
                console.log(response.data)
                //start with 'All ratings' if user doesn't specify any ratings
                setRatings(["All Ratings"].concat(response.data)) //we use concatt incase the user doesnt specify any ratings..
            })
            .catch(e => {
                console.log(e)
            })
    }
    const find = (query, by) => {
        MovieDataService.find(query, by)
            .then(response => {
                console.log(response.data)
                setMovies(response.data.movies)
            })
            .catch(e => {
                console.log(e)
            })
    }
    const findByTitle = () => {
        find(searchTitle, "title")
    }
    const findByRating = () => {
        if (searchRating === "All Ratings") {
            retrieveMovies()
        }
        else {
            find(searchRating, "rated")
        }
    }


    const onChangeSearchTitle = e => { //will be called whnever a user types into the search title field
        const searchTitle = e.target.value
        setSearchTitle(searchTitle); //takes entered value and sets it to the components state
    }
    const onChangeSearchRating = e => {
        const searchRating = e.target.value
        setSearchRating(searchRating);
    }
    //simple react form with a search by title field and search by ratings dropdown. row and col are used to put the 2 search fields into a single row
    return (
        <div className="App">
            <Container>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Search by title"
                                    value={searchTitle}
                                    onChange={onChangeSearchTitle}
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={findByTitle}
                            >
                                Search
                            </Button>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                    as="select" onChange={onChangeSearchRating} >
                                    {ratings.map(rating => {
                                        return (
                                            <option value={rating}>{rating}</option>
                                        )
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={findByRating}
                            >
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    {movies.map((movie) => {
                        return (
                            <Col>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img src={movie.poster + "/100px180"} />
                                    <Card.Body>
                                        <Card.Title>{movie.title}</Card.Title>
                                        <Card.Text>
                                            Rating: {movie.rated}
                                        </Card.Text>
                                        <Card.Text>{movie.plot}</Card.Text>
                                        <Link to={"/movies/" + movie._id} >View Reviews</Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </div>
    )

}

export default MoviesList;