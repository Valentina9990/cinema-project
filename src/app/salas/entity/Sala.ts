class Sala {    
    public idSala: number;
    public nombreSala: string;
    public capacidadSala: number;
    public idCine: number;
    public tipoSala: string;

    constructor(cod:number, nom:string, cap:number, cin:number, tip:string){
        this.idSala = cod;
        this.nombreSala = nom;
        this.capacidadSala = cap;
        this.idCine = cin;
        this.tipoSala = tip;
    }
}

export default Sala;
