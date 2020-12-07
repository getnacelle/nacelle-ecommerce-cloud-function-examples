const countryHandler = require("countrycitystatejson")

exports.handler = async function(event, context, callback) {
  const countries = countryHandler.getCountries()

  if (countries && countries.length) {
    return {
      statusCode: 200,
      body: JSON.stringify(countries)
    }
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify(
        `Could not find get countries from countries database`
      )
    }
  }
}
