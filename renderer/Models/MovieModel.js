export class MovieModel {
  constructor({ id, title = "", director = "", country = "", date = "" }) {
    this.id = id || "" ;
    this.title = title || "";
    this.director = director || "";
    this.country = country || "";
    this.date = date || "";
  }
}