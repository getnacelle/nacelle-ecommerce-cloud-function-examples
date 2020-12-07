const Multipassify = require('multipassify');

/**
 * Use the multipassify package to generate a Multipass login URL
 * @param {Object} event - https://docs.netlify.com/functions/build-with-javascript/#synchronous-function-format
 * @param {Object} context - https://docs.netlify.com/functions/build-with-javascript/#synchronous-function-format
 */
exports.handler = async function (event, _context) {
  try {
    const { MYSHOPIFY_DOMAIN, SHOPIFY_MULTIPASS_SECRET } = process.env;
    const { customerData } = JSON.parse(event.body);
    const multipassify = new Multipassify(SHOPIFY_MULTIPASS_SECRET);
    const multipassUrl = multipassify.generateUrl(
      customerData,
      MYSHOPIFY_DOMAIN
    );

    return {
      statusCode: 200,
      body: multipassUrl,
      headers: { 'content-type': 'text/html' }
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: `Could not generate Multipass URL: ${err.message}`
    };
  }
};
