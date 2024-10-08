export const SQL_SALAS = {
    GET_ALL: "SELECT s.id_sala, s.nombre_sala, s.id_tipo_sala, s.sala_capacidad, s.id_cine FROM salas s",
    ADD: "INSERT INTO salas (nombre_sala, id_tipo_sala, sala_capacidad, id_cine) VALUES ($1, $2, $3, $4) RETURNING id_sala",
    HOW_MANY: "SELECT COUNT(id_sala) as existe FROM salas WHERE id_sala = $1",
    DELETE: "DELETE FROM salas WHERE id_sala = $1",
    UPDATE: "UPDATE salas SET nombre_sala = $1, id_tipo_sala = $2, sala_capacidad = $3, id_cine = $4 WHERE id_sala = $5 RETURNING id_sala",
};