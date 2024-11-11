class menu{
    public idMenuCine : number;
    public idComida : number;
    public idCine : number;
    public precio : number;
    public disponibilidad : boolean;

    constructor(codMenu:number, codComi:number,codCine:number, codPre:number, disPo:boolean){
        this.idMenuCine = codMenu;
        this.idComida = codComi;
        this.idCine = codCine;
        this.precio = codPre;
        this.disponibilidad = disPo;
    }

}
export default menu;
