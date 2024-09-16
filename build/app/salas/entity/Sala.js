"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sala {
    constructor(cod, nom, cap, cin, tip) {
        this.idSala = cod;
        this.nombreSala = nom;
        this.capacidadSala = cap;
        this.idCine = cin;
        this.tipoSala = tip;
    }
}
exports.default = Sala;
