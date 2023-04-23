import React, {useEffect, useState} from "react";
import MovieDataService from "../services/movies";
import {Link} from "react-router-dom";

const Movie = props => {
    const [movie, setMovie] = useState({id: null, title: "", description: "", genre: "", rating: "", reviews: []});
    const getMovie = async (id) => {
        MovieDataService.get(id).then(response => {
            setMovie(response.data);
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    useEffect(() => {
        getMovie(props.match.params.id);
    }, [props.match.params.id]);

    return (
        <div className="container columns-2">
            <img src={movie.poster + "/100px250"} alt={movie.title} className="object-cover h-180 w-full"/>
            <div className="my-8">
                <h1 className="text-3xl font-bold">{movie.title}</h1>
                <p className="text-gray-500 my-2">{movie.rated}</p>
                <p className="text-gray-500 my-2">{movie.plot}</p>
                {props.user &&
                    <Link to={"/movies/" + props.match.params.id + "/review"}>
                        Add Review
                    </Link>}

            </div>

            <div className="grid grid-cols-1 gap-4">
                {movie.reviews.map((review) => (
                    <div key={review.id} className="p-4 card">
                        <p>{review.text}</p>
                        <p className="text-gray-500">{review.user}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Movie;
