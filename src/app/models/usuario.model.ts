export class Usuario {
  constructor(
    // opcionales al final  y su icono de opcional es ?
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: string,
    public uid?: string
  ) {}
}
