
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FilmCard from "../../components/FilmCard";

export default function SingleFilmPage() {
    const { id } = useParams();
    const [film, setFilm] = useState(null);
    const [nome, setNome] = useState("");
    const [recensione, setRecensione] = useState("");
    const [voto, setVoto] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get(`http://${import.meta.env.VITE_SERVER}/films/${id}`)
            .then(resp => setFilm(resp.data))
            .catch(err => console.log(err));
    }, [id]);

    if (!film) return <div>Loading...</div>;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`http://${import.meta.env.VITE_SERVER}/films/${id}/reviews`, {
                name: nome,
                vote: voto,
                text: recensione
            });
            // Ricarica le recensioni
            const resp = await axios.get(`http://${import.meta.env.VITE_SERVER}/films/${id}`);
            setFilm(resp.data);
            setNome("");
            setRecensione("");
            setVoto(1);
        } catch (err) {
            alert("Errore nell'invio della recensione");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
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

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nomeutente" className="form-label">Nome</label>
                    <input type="text" className="form-control" id="nomeutente" value={nome} onChange={e => setNome(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="recensione" className="form-label">inserisci qui la tua recensione</label>
                    <input type="text" className="form-control" id="recensione" value={recensione} onChange={e => setRecensione(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="voto" className="form-label">Voto (1-5)</label>
                    <input type="number" className="form-control" id="voto" min="1" max="5" step="1" value={voto} onChange={e => setVoto(Number(e.target.value))} required />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Invio..." : "Submit"}</button>
            </form>
        </>
    );
}
