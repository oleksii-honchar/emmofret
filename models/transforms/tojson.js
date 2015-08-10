module.exports = function (schema, schemaStruct) {
  schema.options.toJSON = {
    transform: function (doc, ret, options) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
      for (var propertyName in schemaStruct) {
        if (schemaStruct[propertyName].select === false) {
          delete ret[propertyName]
        }
      }
      return ret
    }
  }
}
