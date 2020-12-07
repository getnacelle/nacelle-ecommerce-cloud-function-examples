const countryHandler = require("countrycitystatejson")

exports.handler = async function(event, context, callback) {
  const { countryShortName } = JSON.parse(event.body)
  const provinces = countryHandler.getStatesByShort(countryShortName)

  if (provinces) {
    return {
      statusCode: 200,
      body: JSON.stringify(provinces)
    }
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify(
        `Could not find states or provinces for country with name ${countryShortName} in countries database`
      )
    }
  }
}
