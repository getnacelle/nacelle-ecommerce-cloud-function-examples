const countrycitystatejson = require('countrycitystatejson');

exports.handler = async function (_event, _context) {
  try {
    const countries = countrycitystatejson.getCountries();

    return {
      statusCode: 200,
      body: JSON.stringify(countries),
      headers: { 'content-type': 'application/json' }
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: `Could not find get countries from countries database: ${err.message}`
    };
  }
};
