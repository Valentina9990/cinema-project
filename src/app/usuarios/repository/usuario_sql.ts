export const SQL_USUARIOS = {
    GET_ALL: `
        SELECT u.id_usuario, u.nombre_usuario, u.apellido_usuario, u.contrasena_usuario, 
               u.fecha_creacion, u.fecha_nacimiento_usuario, u.id_cine, u.id_cargo, u.email_usuario 
        FROM Usuarios u`,
        
    ADD: `
        INSERT INTO Usuarios (nombre_usuario, apellido_usuario, contrasena_usuario, fecha_creacion, 
                              fecha_nacimiento_usuario, id_cine, id_cargo, email_usuario)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
        RETURNING id_usuario`,
    
    HOW_MANY: `
        SELECT COUNT(id_usuario) as existe 
        FROM Usuarios 
        WHERE id_usuario = $1`,
    
    DELETE: `
        DELETE FROM Usuarios 
        WHERE id_usuario = $1`,
    
    UPDATE: `
        UPDATE Usuarios 
        SET nombre_usuario = $1, apellido_usuario = $2, contrasena_usuario = $3, fecha_creacion = $4, 
            fecha_nacimiento_usuario = $5, id_cine = $6, id_cargo = $7, email_usuario = $8 
        WHERE id_usuario = $9 
        RETURNING id_usuario`
};
