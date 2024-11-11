class Sala {
  public idSala: number;
  public nombreSala: string;
  public capacidad: number;
  public idCine: number;
  public idTipoSala : number;

  constructor(cod: number, nom: string, cap: number, idC:number,idTpSa:number) {
    this.idSala = cod;
    this.nombreSala = nom;
    this.capacidad = cap;
    this.idCine = idC;
    this.idTipoSala=idTpSa;
  }
}

export default Sala; //no olvidar esta linea - es para poder usarlo

