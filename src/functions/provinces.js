const countrycitystatejson = require('countrycitystatejson');

exports.handler = async function (event, _context, _callback) {
  try {
    const { countryShortName } = JSON.parse(event.body);
    const provinces = countrycitystatejson.getStatesByShort(countryShortName);

    return {
      statusCode: 200,
      body: provinces
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: `Could not find states or provinces for country with name ${countryShortName} in countries database: ${err.message}`
    };
  }
};
