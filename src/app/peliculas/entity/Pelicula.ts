class Pelicula{
    public idPelicula : Number;
    public nombrePelicula : string;
    public idGenero : Number;
    public duracionPelicula : Number;
    public idioma : string;

    constructor(cod:Number, nom:string, gen:Number, dur:Number, idi:string){
        this.idPelicula = cod;
        this.nombrePelicula = nom;
        this.idGenero = gen;
        this.duracionPelicula = dur;
        this.idioma = idi;
    }

}

export default Pelicula;