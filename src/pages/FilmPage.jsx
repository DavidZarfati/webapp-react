import axios from "axios"
import { useEffect, useState } from "react"


export default function FilmPage() {
    const [films, setFilms] = useState([])

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
            <ul>

                {films.map((film) => <li key={film.id}>{film.title}</li>)}

            </ul>
        </>
    )
}