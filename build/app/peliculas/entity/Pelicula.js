"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pelicula {
    constructor(cod, nom, gen, dur, idi, sin, thumb) {
        this.idPelicula = cod;
        this.nombrePelicula = nom;
        this.idGenero = gen;
        this.duracionPelicula = dur;
        this.idioma = idi;
        this.sinopsisPelicula = sin;
        this.thumbnail = thumb;
    }
}
exports.default = Pelicula;
