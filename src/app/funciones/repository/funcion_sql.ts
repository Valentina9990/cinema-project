export const SQL_FUNCIONES = {
    FIND_BY_ID: "SELECT f.id_funcion, f.id_sala, f.id_pelicula, f.fecha_funcion, f.hora_inicio_funcion FROM funciones f WHERE f.id_funcion = $1",
    GET_ALL_PAGINATED: "SELECT f.id_funcion, f.id_sala, f.id_pelicula, f.fecha_funcion, f.hora_inicio_funcion FROM funciones f LIMIT $1 OFFSET $2",
    GET_ALL: "SELECT f.id_funcion, f.id_sala, f.id_pelicula, f.fecha_funcion, f.hora_inicio_funcion FROM funciones f",
    ADD: "INSERT INTO funciones (id_sala, id_pelicula, fecha_funcion, hora_inicio_funcion) VALUES ($1, $2, $3, $4) RETURNING *",
    HOW_MANY: "SELECT COUNT(id_funcion) as existe FROM funciones WHERE id_funcion = $1",
    DELETE: "DELETE FROM funciones WHERE id_funcion = $1",
    UPDATE: "UPDATE funciones SET id_sala = $1, id_pelicula = $2, fecha_funcion = $3, hora_inicio_funcion = $4 WHERE id_funcion = $5 RETURNING *",
    UPDATE_ROOM: "UPDATE funciones SET id_sala = $1",
    DELETE_BY_ROOM: "DELETE FROM funciones WHERE id_sala = $1"
};