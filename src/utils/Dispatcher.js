// @flow

export default class Dispatcher {
  listeners: Function[] = [];

  dispatch(...values: any[]) {
    this.listeners.forEach((listener: Function) => listener(...values));
  }

  listen(callback: Function) {
    this.listeners.push(callback);
  }

  unlisten(callback: Function) {
    const index = this.listeners.indexOf(callback);
    this.listeners.splice(index, 1);
  }
}
