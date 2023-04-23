import React, {useState, useEffect} from "react";
import MovieDataService from "../services/movies";
import {Container, Form} from "react-bootstrap";
import {ChevronDownIcon} from '@heroicons/react/solid';
import {Link} from "react-router-dom";

const MoviesList = props => {
    const [movies, setMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchRating, setSearchRating] = useState("");
    const [ratings, setRatings] = useState(["All Ratings"]);

    function retrieveMovies() {
        MovieDataService.getAll()
            .then(response => {
                setMovies(response.data.movies);
            })
            .catch(e => {
                console.log(e);
            });
    }

    function retrieveRatings() {
        MovieDataService.getRating()
            .then(response => {
                setRatings(["All Ratings"].concat(response.data));
            })
            .catch(e => {
                console.log(e);
            });
    }

    const onsetSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    }

    const onChangeSearchRating = e => {
        const searchRating = e.target.value;
        setSearchRating(searchRating);
    }

    useEffect(() => {
        retrieveMovies();
        retrieveRatings();
    }, []);

    function findByRating(event) {
        event.preventDefault();
        if (searchRating === "All Ratings") {
            retrieveMovies()
        } else {
            MovieDataService.find(searchRating, "genre")
                .then(response => {
                    console.log(response.data);
                    setMovies(response.data.movies);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    function findByTitle(event) {
        event.preventDefault();
        MovieDataService.find(searchTitle, "title")
            .then(response => {
                console.log(" found by title");
                console.table(response.data)
                setMovies(response.data.movies);
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <div className="App">
            <Container>
                <Form>
                    <Form.Group className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-3">
                        <div>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    type="text"
                                    name="searchTitle"
                                    id="searchTitle"
                                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md"
                                    placeholder="Enter movie title"
                                    value={searchTitle}
                                    onChange={onsetSearchTitle}
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center">
                                    <button
                                        onClick={findByTitle}
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <select
                                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md appearance-none"
                                    name="searchRating"
                                    id="searchRating"
                                    value={searchRating}
                                    onChange={onChangeSearchRating}
                                >
                                    {ratings.map((rating) => (
                                        <option key={rating} value={rating}>
                                            {rating}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-24 flex items-center pr-3 pointer-events-none">
                                    <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center">
                                    <button
                                        onClick={findByRating}
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Form.Group>
                </Form>
            </Container>
            <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-6">
                {movies.map((movie) => (
                    <div key={movie._id} className="card w-100 bg-base-100 bg-white shadow-md">
                        {!movie.poster ? <img src="https://cdn-01.media-brady.com/store/stuk/media/catalog/product/d/m/dmeu_y2691646_01_std.lang.all.gif"
                                              alt={movie.title} className="object-cover h-180 w-full"/> :
                            <img src={movie.poster + "/100px180"}
                                 alt={movie.title} className="object-cover h-180 w-full"/>
                        }
                        <div className="p-4">
                            <h2 className="font-bold text-lg mb-2">{movie.title}</h2>
                            <h2 className="font-bold text-lg mb-2">Rating: {movie.rated}</h2>
                            <p className="text-gray-700 text-base">{movie.plot}</p>
                            <Link to={"/movies/" + movie._id}>View Reviews</Link>
                        </div>
                    </div>
                ))}
            </div>
            {/*<pre>{JSON.stringify(movies, null, 2)}</pre>*/}
        </div>
    );
}


export default MoviesList;
