const Multipassify = require('multipassify');

/**
 * Use the multipassify package to generate a Multipass login URL
 * @param {Object} event  - https://docs.netlify.com/functions/build-with-javascript/#synchronous-function-format
 * @param {Object} context - https://docs.netlify.com/functions/build-with-javascript/#synchronous-function-format
 * @param {Object} callback - https://docs.netlify.com/functions/build-with-javascript/#synchronous-function-format
 */
exports.handler = async function (event, _context, _callback) {
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
      body: JSON.stringify(multipassUrl),
      headers: { 'content-type': 'text/html' }
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(`Could not generate Multipass URL: ${err.message}`)
    };
  }
};
