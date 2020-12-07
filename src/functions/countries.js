const countrycitystatejson = require('countrycitystatejson');

exports.handler = async function (_event, _context, _callback) {
  try {
    const countries = countrycitystatejson.getCountries();

    return {
      statusCode: 200,
      body: JSON.stringify(countries)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        `Could not find get countries from countries database: ${err.message}`
      )
    };
  }
};
