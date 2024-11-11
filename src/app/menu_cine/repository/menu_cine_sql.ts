export const SQL_MENU_CINE ={
    GET_ALL:
    "SELECT  m.id_menu_cine, m.id_comida, \
      m.id_cine, m.precio, m.disponibilidad FROM Menu_cine m",
    ADD:
    "INSERT INTO Menu_cine( id_menu_cine, id_comida, \
    id_cine, precio, disponibilidad) VALUES($1,$2,$3,$4,$5) RETURNING id_menu_cine",

    HOW_MANY: 
    "SELECT COUNT(id_menu_cine) as existe FROM Menu_cine WHERE id_menu_cine = $1",

    DELETE:
    "DELETE FROM Menu_cine WHERE id_menu_cine = $1",

    UPDATE_MASIVO: "UPDATE Menu_cine SET precio = $1",

    PAGE:
    "SELECT * FROM comidas ORDER BY precio LIMIT 10 OFFSET 0"



  

}