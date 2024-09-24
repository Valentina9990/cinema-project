export const SQL_PELICULAS = {
    GET_ALL : "SELECT id_pelicula, nombre_pelicula, id_genero, duracion_pelicula, idioma FROM peliculas" ,

    /*
    ADD : "INSERT INTO peliculas(nombre_pelicula, id_genero, duracion_pelicula, idioma) VALUES($1, $2, $3, $4)",

    HOW_MANY : "SELECT COUNT(id_pelicula) as existe FROM peliculas WHERE id_pelicula = $1",

    DELETE : "DELETE FROM peliculas WHERE id_pelicula = $1",

    UPDATE : "UPDATE peliculas SET nombre_pelicula=$1, id_genero=$2, duracion_pelicula=$3, idioma=$4 WHERE id_pelicula=$5 RETURNING id_pelicula",

    */
}