class Pelicula {
    public idPelicula: Number;
    public nombrePelicula: string;
    public idGenero: Number;
    public duracionPelicula: Number;
    public idioma: string;
    public sinopsisPelicula: string;
    public thumbnail: string;

    constructor(
        cod: Number,
        nom: string,
        gen: Number,
        dur: Number,
        idi: string,
        sin: string,
        thumb: string
    ) {
        this.idPelicula = cod;
        this.nombrePelicula = nom;
        this.idGenero = gen;
        this.duracionPelicula = dur;
        this.idioma = idi;
        this.sinopsisPelicula = sin;
        this.thumbnail = thumb;
    }
}

export default Pelicula;
