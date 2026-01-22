import React from "react";
import { NavLink } from "react-router-dom";

export default function FilmCard({ id, title, director, genre, abstract, image }) {
    return (
        <div className="card" style={{ width: "18rem", margin: "1rem auto" }}>
            <img
                src={image || "https://via.placeholder.com/286x180?text=No+Image"}
                className="card-img-top film-img-responsive"
                alt={title}
            />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{abstract}</p>
                <NavLink to={`/films/${id}`}>Review</NavLink>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item"><b>Regista:</b> {director}</li>
                <li className="list-group-item"><b>Genere:</b> {genre}</li>
            </ul>
        </div>
    );
}
