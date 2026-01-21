import axios from "axios"
import { useEffect, useState } from "react"

export default function FilmPage() {
    const [films, setFilms] = useState([])

    useEffect(() => {
        console.log("Chiamo Api");
        axios
            .get("http://localhost:3000/films/")
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
            <ul>

                {films.map((film) => <li key={film.id}>{film.title}</li>)}

            </ul>
        </>
    )
}