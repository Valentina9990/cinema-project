export const Sql_cines = {
    GET_ALL:"SELECT c.id_cine, c.id_ubicacion, c.nombre_cine, c.telefono_cine \
     FROM cines c LIMIT $1 OFFSET $2",

     ADD: "INSERT INTO cines(id_cine, id_ubicacion, nombre_cine, telefono_cine) \
     VALUES ($1, $2, $3, $4) RETURNING id_cine",

     HOW_MANY: "SELECT COUNT(id_cine) as existe FROM cines WHERE nombre_cine = $1",


     DELETE: "DELETE FROM cines WHERE id_cine = $1",

     UPDATE_MASIVO: "UPDATE cines SET  id_ubicacion = $1, nombre_cine = $2, telefono_cine = $3 \
     WHERE id_cine =$9, RETURNING id_cine",
};


