export const SQL_FUNCIONES = {
    GET_ALL: "SELECT f.id_funcion, f.id_sala, f.id_pelicula, f.fecha_funcion, f.hora_inicio_funcion FROM funciones f",
    ADD: "INSERT INTO funciones (id_sala, id_pelicula, fecha_funcion, hora_inicio_funcion) VALUES ($1, $2, $3, $4) RETURNING *",
    HOW_MANY: "SELECT COUNT(id_funcion) as existe FROM funciones WHERE id_funcion = $1",
    DELETE: "DELETE FROM funciones WHERE id_funcion = $1",
    UPDATE: "UPDATE funciones SET id_sala = $1, id_pelicula = $2, fecha_funcion = $3, hora_inicio_funcion = $4 WHERE id_funcion = $5 RETURNING *",
};