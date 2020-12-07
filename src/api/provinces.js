import countrycitystatejson from 'countrycitystatejson';

/**
 * Use the multipassify package to generate a Multipass login URL
 * @param {Object} req  - HTTP request object (see https://vercel.com/docs/runtimes#official-runtimes/node-js/node-js-request-and-response-objects/node-js-helpers)
 * @param {Object} req.body - HTTP request body
 * @param {Object} req.body.countryShortName - Country short name code (e.g. 'US' for United States, 'AR' for Argentina)
 * @param {Object} res - HTTP response object (see https://vercel.com/docs/runtimes#official-runtimes/node-js/node-js-request-and-response-objects/node-js-helpers)
 */
export default function (req, res) {
  try {
    const body = JSON.parse(req.body);

    if (!body || !body.countryShortName) {
      throw new Error(
        `'countryShortName' is required in the POST body by /api/get-provinces`
      );
    }

    res
      .status(200)
      .send(countrycitystatejson.getStatesByShort(body.countryShortName));
  } catch (err) {
    res.status(500).send(err.message);
  }
}