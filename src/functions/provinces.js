const countrycitystatejson = require('countrycitystatejson');

exports.handler = async function (event, _context) {
  try {
    const { countryShortName } = JSON.parse(event.body);
    const provinces = countrycitystatejson.getStatesByShort(countryShortName);

    return {
      statusCode: 200,
      body: JSON.stringify(provinces),
      headers: { 'content-type': 'application/json' }
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: `Could not find states or provinces for country with name ${countryShortName} in countries database: ${err.message}`
    };
  }
};
