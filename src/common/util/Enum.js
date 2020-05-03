export default class Enum {
  constructor(valuesByNames) {
    this.valuesByNames = Object.freeze(valuesByNames);
    this.names = Object.keys(valuesByNames);
    this.values = Object.values(valuesByNames);

    // store reverse lookup
    const namesByValues = {};
    this.names.forEach(name => namesByValues[valuesByNames[name]] = name);
    this.namesByValues = Object.freeze(namesByValues);

    for (const name in valuesByNames) {
      if (this[name] !== undefined) {
        throw new Error('Invalid name in enum already used by Enum class: ' + name);
      }
      this[name] = valuesByNames[name];
    }
  }

  get byName() {
    return this.valuesByNames;
  }

  getCount() {
    return this.names.length;
  }

  getName = (value) => {
    return this.namesByValues[value];
  }

  getValue = (name) => {
    return this.valuesByNames[name];
  }

  /**
   * Will get the value, no matter if you give it a name or a value
   */
  valueFrom = (nameOrValue) => {
    let value = this.getValue(nameOrValue);
    if (value !== undefined) {
      return value;
    }
    else {
      const name = this.getName(nameOrValue);
      return (name !== undefined ? nameOrValue : this.getValue(nameOrValue));
    }
  }

  /**
   * Throws an error if given parameter is not a valid value or name.
   */
  valueFromForce = (nameOrValue) => {
    const value = this.valueFrom(nameOrValue);
    if (value === undefined) {
      throw new Error(`Invalid name or value: ${nameOrValue} (enum = ${JSON.stringify(this.valuesByNames)})`);
    }
    return value;
  }

  /**
   * Will get the value, no matter if you give it a name or a value.
   * @returns {string}
   */
  nameFrom = (nameOrValue) => {
    let name = this.getName(nameOrValue);
    if (name !== undefined) {
      return name;
    }
    else {
      const value = this.getValue(nameOrValue);
      return (value !== undefined ? nameOrValue : this.getName(nameOrValue));
    }
  }

  /**
   * Throws an error if given parameter is not a valid value or name
   */
  nameFromForce = (nameOrValue) => {
    const value = this.nameFrom(nameOrValue);
    if (value === undefined) {
      debugger;
      throw new Error(`Invalid name or value: ${nameOrValue} (enum = ${JSON.stringify(this.valuesByNames)})`);
    }
    return value;
  }
}