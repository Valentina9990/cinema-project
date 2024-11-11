"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_COMIDAS = void 0;
exports.SQL_COMIDAS = {
    GET_ALL: "SELECT c.id_comida, c.nombre_comida FROM comidas c",
    ADD: "INSERT INTO comidas (id_comida,nombre_comida) VALUES ($1,$2) RETURNING id_comida",
    HOW_MANY: "SELECT COUNT(id_comida) as existe FROM comidas WHERE id_comida = $1",
    //Verificar si el nombre de la comida ya existe
    CHECK_NAME: "SELECT COUNT(*) AS existe FROM comidas WHERE nombre_comida = $1",
    DELETE: "DELETE FROM comidas WHERE id_comida = $1",
    UPDATE_MASIVO: "UPDATE comidas SET nombre_comida = $1",
    PAGE: "SELECT * FROM comidas ORDER BY nombre_comida LIMIT 10 OFFSET 0",
    EXITS_IN_MENU: "SELECT COUNT(id_comida) FROM menu_cine WHERE id_comida = $1"
};
