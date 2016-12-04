export default class Model {
  /**
   * @type {number}
   */
  id

  constructor(id = null) {
    this.id = id || Model.id++
  }
}

Model.id = 1
