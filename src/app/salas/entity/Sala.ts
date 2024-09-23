class Sala {    
    public idSala: number;
    public nombreSala: string;
    public capacidadSala: number;
    public idCine: number;
    public tipoSala: number;

    constructor(cod:number, nom:string, cap:number, cin:number, tip:number){
        this.idSala = cod;
        this.nombreSala = nom;
        this.capacidadSala = cap;
        this.idCine = cin;
        this.tipoSala = tip;
    }
}

export default Sala;
