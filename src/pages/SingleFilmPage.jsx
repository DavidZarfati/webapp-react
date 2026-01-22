
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FilmCard from "../../components/FilmCard";

export default function SingleFilmPage() {
    const { id } = useParams();
    const [film, setFilm] = useState(null);

    useEffect(() => {
        axios.get(`http://${import.meta.env.VITE_SERVER}/films/${id}`)
            .then(resp => setFilm(resp.data))
            .catch(err => console.log(err));
    }, [id]);

    if (!film) return <div>Loading...</div>;

    return (
        <div>
            <FilmCard
                id={film.id}
                title={film.title}
                director={film.director}
                genre={film.genre}
                abstract={film.abstract}
                image={`/img/movies_cover/${film.image}`}
            />
            <h2>Recensioni</h2>
            {(!film.reviews || film.reviews.length === 0) ? (
                <p>Nessuna recensione disponibile.</p>
            ) : (
                <ul>
                    {film.reviews.map((review) => (
                        <li key={review.id}>
                            <b>{review.reviewer}</b> (voto : {review.rating}): {review.comment}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
