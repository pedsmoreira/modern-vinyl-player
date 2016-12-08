import Store from './Store'

export default class Model {
  static name
  static table

  /**
   * @type {Store}
   */
  static store = null

  /**
   * @type {string}
   */
  static keyColumn = 'id'

  /**
   * @type {Object}
   */
  static storeProperties = {}

  /**
   * Get model store
   * @return {Store}
   */
  store() {
    return this.constructor.resolveStore()
  }

  /**
   * Get value of primary key
   * @return {*}
   */
  key() {
    return this[this.constructor.keyColumn]
  }

  /**
   * Set key value to model
   * @param value
   */
  setKey(value) {
    this[this.constructor.keyColumn] = value
  }

  /**
   * Get mapped properties with values of model
   * The shallow map does not contain objects (consequently, does not contain FKs)
   * @return {{}}
   */
  shallowMap() {
    let map = {}
    Object.keys(this).forEach(key => {
      if (typeof this[key] !== 'object')
        map[key] = this[key]
    })

    return map
  }

  /**
   * Get shallow map merged with denormalized values
   * @return {{}}
   */
  persistentMap() {
    return Object.assign(this.shallowMap(), this.denormalized())
  }

  /**
   * Get foreign key name for a given model and options
   * @param {Function} model
   * @param {Object} options
   * @return {*|string}
   */
  foreignKey(model, options = {}) {
    return `${model.singularUnderscoredName()}_${options.fk || model.keyColumn}`
  }

  /**
   * Set values to instance
   * @param values
   * @return {Model}
   */
  set(values) {
    Object.keys(values).forEach(key => {
      this[key] = values[key]
    })

    return this
  }

  /**
   * Persist model
   */
  save() {
    let method = this[this.keyColumn] ? 'update' : 'create'
    this.store()[method](Object.assign(this.persistentMap()))
  }

  /**
   * Destroy model
   */
  destroy() {
    this.store().destroy(this.key())
  }

  /**
   * Duplicate model
   * @return {Model}
   */
  duplicate() {
    let map = this.shallowMap()
    delete map[this.constructor.keyColumn]

    return this.constructor.make(map)
  }

  /**
   * Normalize model
   * This method should filled by model extensions
   * @param data
   */
  normalize(data) {
  }

  /**
   * Get array with denormalized properties
   * This method should be filled by model exteions
   * @return {{}}
   */
  denormalized() {
    return {}
  }

  /**
   * Get promise to belongsToOne FK relation
   * @param {Model|Function} model
   * @param {Object} options
   * @return {Promise}
   */
  belongsTo(model, options = {}) {
    return model.find(this[this.foreignKey(model, options)])
  }

  /**
   * Get promise to belongsToMany FK relation
   * @param model
   * @return {Promise}
   */
  belongsToMany(model, value) {
    return this.hasMany(model)
  }

  /**
   * Get promise to hasOne FK relation
   * @param model
   * @return {Promise}
   */
  hasOne(model) {
    return this.hasMany(model)
  }

  /**
   * Get promise to hasMany FK relation
   * @param model
   * @return {Promise}
   */
  hasMany(model) {
    return model.resolveStore().by(this)
  }

  /**
   * Find model object by id
   * @param key
   * @return {Promise}
   */
  static find(key) {
    return this.resolveStore().get(key)
  }

  /**
   * Get list of stores
   * @return {Promise}
   */
  static all() {
    return this.resolveStore().index()
  }

  /**
   * Create one or an array of model instances
   * @param values
   * @return {Model|Model[]}
   */
  static make(values) {
    if (Array.isArray(values)) return values.map(it => this.make(it))
    return new this().set(values)
  }

  /**
   * Create and persist one or an array of model instances
   * @param values
   * @return {Promise|Promise[]}
   */
  static create(values) {
    if (Array.isArray(values)) return values.map(it => this.create(it))
    return new this().set(values).instance.save()
  }

  /**
   * Get an instance of store
   * @param {{}} properties
   * @param {Function} modelClass
   * @return {Store}
   */
  static resolveStore(properties = this.storeProperties, modelClass = this) {
    return this.store = this.store || new Store(modelClass, properties)
  }

  /**
   * Get singular table name
   * @return {string}
   */
  static singularName() {
    return this.table.substring(0, this.table.length - 1)
  }

  /**
   * Get capitalized singular table name
   * @return {string}
   */
  static singularCapitalizedName() {
    let name = this.singularName()
    return name.substring(0, 1).toUpperCase() + name.substring(1)
  }

  /**
   * Get path to model in unerscore case
   * @return {string}
   */
  static singularUnderscoredName() {
    return this.singularName().replace(/\.?([A-Z])/g, function (x, y) {
      return "_" + y.toLowerCase()
    }).replace(/^_/, "");
  }
}
