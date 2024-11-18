class Cine {
    public idCine:number;
    public idUbicacion:number;
    public nombreCine:string;
    public telefonoCine:string;

    
    constructor(code:number,nom:string,codeUb:number,telCin:string){
        this.idCine = code;
        this.nombreCine = nom;
        this.idUbicacion = codeUb;
        this.telefonoCine = telCin;
    }
}

export default Cine;
