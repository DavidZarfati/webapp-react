
import axios from "axios";
import "../App.css";
import { useEffect, useState } from "react";
import FilmCard from "../../components/FilmCard";


export default function FilmPage() {
    const [films, setFilms] = useState([])

    //log del localhost che sto usando poi da rimuovere
    console.log(import.meta.env.VITE_SERVER);

    useEffect(() => {
        console.log("Chiamo Api");
        axios
            .get(`http://${import.meta.env.VITE_SERVER}/films/`)
            .then((resp) => {
                setFilms(resp.data.results)
            })
            .catch((err) => {
                console.log(err);
            })

    }, [])


    return (
        <>
            <h1>Lista dei film</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
                {films.map((film) => (
                    <FilmCard
                        key={film.id}
                        id={film.id}
                        title={film.title}
                        director={film.director}
                        genre={film.genre}
                        abstract={film.abstract}
                        image={`/img/movies_cover/${film.image}`}
                    />
                ))}
            </div>
        </>
    );
}