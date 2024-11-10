class Funcion {
  public idFuncion: number;
  public idSala: number;
  public idPelicula: number;
  public fechaFuncion: string;
  public horaInicioFuncion: string;

  constructor(
    idFuncion: number,
    idSala: number,
    idPelicula: number,
    fechaFuncion: string,
    horaInicioFuncion: string
  ) {
    this.idFuncion = idFuncion;
    this.idSala = idSala;
    this.idPelicula = idPelicula;
    this.fechaFuncion = fechaFuncion;
    this.horaInicioFuncion = horaInicioFuncion;
  }
}

export default Funcion;
