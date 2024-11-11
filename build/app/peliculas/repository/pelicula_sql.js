"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_PELICULAS = void 0;
exports.SQL_PELICULAS = {
    GET_ALL: "SELECT id_pelicula, nombre_pelicula, id_genero, duracion_pelicula, idioma FROM Peliculas",
    PAGINACION: "SELECT id_pelicula, nombre_pelicula, id_genero, duracion_pelicula, idioma FROM Peliculas LIMIT $1 OFFSET $2",
    ADD: "INSERT INTO Peliculas(nombre_pelicula, id_genero, duracion_pelicula, idioma) VALUES($1, $2, $3, $4) RETURNING id_pelicula",
    HOW_MANY: "SELECT COUNT(id_pelicula) as existe FROM Peliculas WHERE id_pelicula = $1",
    HOW_MANY_NAME: "SELECT COUNT(nombre_pelicula) as existe FROM Peliculas WHERE nombre_pelicula = $1",
    DELETE: "DELETE FROM Peliculas WHERE id_genero = $1",
    UPDATE: "UPDATE Peliculas SET id_pelicula = $1, nombre_pelicula=$2, id_genero = $3, duracion_pelicula = $4, idioma=$5\
        WHERE id_pelicula = $1 RETURNING id_pelicula",
    UPDATE_ALL: "UPDATE Peliculas SET id_genero = $1 RETURNING 'Actualizado'",
    HOW_MANY_GENERO: "SELECT COUNT(*) as existe FROM Generos WHERE id_genero = $1"
};
