export const SQL_PELICULAS = {
  GET_ALL:
    "SELECT id_pelicula, nombre_pelicula, sinopsis_pelicula, id_genero, duracion_pelicula, idioma, thumbnail FROM Peliculas",

  PAGINACION:
    "SELECT id_pelicula, nombre_pelicula, sinopsis_pelicula, id_genero, duracion_pelicula, idioma, thumbnail FROM Peliculas LIMIT $1 OFFSET $2",

  GET_ALL_WITH_SHOWS_PAGINATED:
    "SELECT peliculas.id_pelicula, nombre_pelicula, sinopsis_pelicula, id_genero, duracion_pelicula, idioma, funciones.fecha_funcion, funciones.hora_inicio_funcion, thumbnail FROM peliculas LIMIT $1 OFFSET $2 LEFT JOIN funciones ON Peliculas.id_pelicula = funciones.id_pelicula",

  ADD: "INSERT INTO Peliculas(nombre_pelicula, id_genero, duracion_pelicula, idioma, sinopsis_pelicula, thumbnail) VALUES($1, $2, $3, $4, $5, $6) RETURNING id_pelicula",

  HOW_MANY:
    "SELECT COUNT(id_pelicula) as existe FROM Peliculas WHERE id_pelicula = $1",

  HOW_MANY_NAME:
    "SELECT COUNT(nombre_pelicula) as existe FROM Peliculas WHERE nombre_pelicula = $1",

  HOW_MANY_GENERO: "SELECT COUNT(*) as existe FROM Generos WHERE id_genero = $1",

  DELETE: "DELETE FROM Peliculas WHERE id_pelicula = $1",

  UPDATE:
    "UPDATE Peliculas SET id_pelicula = $1, nombre_pelicula=$2, id_genero = $3, duracion_pelicula = $4, idioma=$5\
        WHERE id_pelicula = $1 RETURNING id_pelicula",

  UPDATE_ALL: "UPDATE Peliculas SET idioma = $1 RETURNING 'Actualizado'",

  GET_BY_ID:
    "SELECT id_pelicula, nombre_pelicula, sinopsis_pelicula, id_genero, duracion_pelicula, idioma, thumbnail FROM Peliculas WHERE id_pelicula = $1",

  SEARCH_BY_NAME:
    "SELECT id_pelicula, nombre_pelicula, sinopsis_pelicula, id_genero, duracion_pelicula, idioma, thumbnail FROM Peliculas WHERE nombre_pelicula like $1",
};
