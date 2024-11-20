export const Sql_cines = {
    // Devuelve cines con el nombre de la ubicación en lugar del id
    GET_ALL: `
      SELECT 
        c.id_cine, 
        u.nombre_ubicacion, 
        c.nombre_cine, 
        c.telefono_cine 
      FROM 
        cines c
      INNER JOIN 
        ubicaciones u 
      ON 
        c.id_ubicacion = u.id_ubicacion
      LIMIT $1 OFFSET $2
    `,
  
    // Inserta un cine, omitiendo id_cine (es autoincremental)
    ADD: `
      INSERT INTO cines(id_ubicacion, nombre_cine, telefono_cine) 
      VALUES ($1, $2, $3) 
      RETURNING id_cine
    `,
  
    // Consulta si existe un cine con el mismo nombre
    HOW_MANY: `
      SELECT COUNT(*) as existe 
      FROM cines 
      WHERE nombre_cine = $1
    `,
  
    // Elimina un cine por su ID
    DELETE: `
      DELETE FROM cines 
      WHERE id_cine = $1
    `,
  
    // SQL_CINES.CHECK_ID: Verifica si el cine existe
CHECK_ID: `
SELECT COUNT(*) AS existe
FROM cines
WHERE id_cine = $1
`,

// SQL_CINES.UPDATE: Actualiza la información del cine
UPDATE: `
UPDATE cines
SET nombre_cine = $1, telefono_cine = $2
WHERE id_cine = $3
RETURNING id_cine, nombre_cine, telefono_cine;

`,

  };
  
