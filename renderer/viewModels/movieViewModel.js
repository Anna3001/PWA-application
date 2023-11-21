export class movieViewModel {
  constructor() {
    var self = this;

    self.data = ko.observableArray("");
  }

  update(d) {
    this.data(d);
  }

  getData() {
    return this.data;
  }
}