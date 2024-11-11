"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sala {
    constructor(cod, nom, cap, idC, idTpSa) {
        this.idSala = cod;
        this.nombreSala = nom;
        this.capacidad = cap;
        this.idCine = idC;
        this.idTipoSala = idTpSa;
    }
}
exports.default = Sala; //no olvidar esta linea - es para poder usarlo
