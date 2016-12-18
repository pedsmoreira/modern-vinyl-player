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
   * Get promise to belongsTo FK relation
   * @param {Function} model
   * @param {Object} options
   * @return {Promise}
   */
  belongsTo(model, options = {}) {
    return this.constructor.belongsTo(model, this, options)
  }

  /**
   * Get promise to belongsTo FK relation
   * @param {Function} model
   * @param {Model} instance
   * @param {Object} options
   * @return {Promise}
   */
  static belongsTo(model, instance, options = {}) {
    return model.find(instance[instance.foreignKey(model, options)])
  }

  /**
   * Get promise to belongsToMany FK relation
   * @param {Function} model
   * @param {Object} options
   * @return {Promise}
   */
  belongsToMany(model, options = {}) {
    return this.constructor.belongsToMany(model, this, options)
  }

  /**
   * Get promise to belongsToMany FK relation
   * @param model
   * @param instance
   * @param options
   * @return {Promise}
   */
  static belongsToMany(model, instance, options = {}) {
    return this.hasMany(model, instance, options)
  }

  /**
   * Get promise to hasOne FK relation
   * @param {Function} model
   * @return {Promise}
   */
  hasOne(model) {
    return this.constructor.hasOne(model, this.key())
  }

  /**
   * Get promise to hasOne FK relation statically
   * @param {Function} model
   * @param {*} value
   * @param {Object} options
   * @return {Promise}
   */
  static hasOne(model, value, options = {}) {
    return this.resolveStore().by(model, value, options)
  }

  /**
   * Get promise to hasMany FK relation
   * @param {Function} model
   * @param {Object} options
   * @return {Promise}
   */
  hasMany(model, options = {}) {
    return this.constructor.hasMany(model, this, options)
  }

  /**
   * Get promise to hasMany FK relation statically
   * @param {Function} model
   * @param {Model} instance
   * @param {Object} options
   * @return {Promise}
   */
  static hasMany(model, instance, options) {
    return model.resolveStore().by(instance, null, options)
  }

  saveToLocalStorage() {

  }

  static fromLocalStorage(id) {

  }

  /**
   * Find model object by id
   * @param {*} key
   * @param {Object} options
   * @return {Promise}
   */
  static find(key, options = undefined) {
    return this.resolveStore().get(key, options)
  }

  /**
   * Find model object by property value
   * @param {string} property
   * @param {*} value
   * @param {Object} options
   * @return {Promise}
   */
  static where(property, value, options = undefined) {
    return this.resolveStore().where(property, value, options)
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
   * @param {Object} values
   * @return {Model|Model[]}
   */
  static make(values) {
    if (Array.isArray(values)) return values.map(it => this.make(it))
    return new this().set(values)
  }

  /**
   * Create and persist one or an array of model instances
   * @param {Object} values
   * @return {Promise|Promise[]}
   */
  static create(values) {
    if (Array.isArray(values)) return values.map(it => this.create(it))
    return new this().set(values).instance.save()
  }

  /**
   * Get an instance of store
   * @param {Object} properties
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
    return this.name || this.table.substring(0, this.table.length - 1)
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
