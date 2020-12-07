const fetch = require('node-fetch');

/**
 * Fetch the Price Rule associated with a Discount Code using the Shopify Storefront API
 * @param {Object} event - https://docs.netlify.com/functions/build-with-javascript/#synchronous-function-format
 * @param {Object} event.body - HTTP request body
 * @param {Object} event.body.discountCode - Discount code for which we need to look up the associated Price Rule
 * @param {Object} context - https://docs.netlify.com/functions/build-with-javascript/#synchronous-function-format
 */
exports.handler = async function (event, _context) {
  try {
    const { MYSHOPIFY_DOMAIN, SHOPIFY_ADMIN_PASSWORD } = process.env;
    const { discountCode } = JSON.parse(event.body);

    // Find the Price Rule ID associated with the discount code
    // NOTE: Shopify sends back a 303 redirect with the price rule URL in the `location` header
    const discountCodeEndpoint = `https://${MYSHOPIFY_DOMAIN}/admin/api/2021-01/discount_codes/lookup.json?code=${discountCode}`;
    const redirectUrl = await fetch(discountCodeEndpoint, {
      headers: {
        'X-Shopify-Access-Token': SHOPIFY_ADMIN_PASSWORD,
        'Content-Type': 'application/json'
      },
      redirect: 'manual'
    }).then((res) => res.headers.get('location'));
    console.log(`url: ${discountCodeEndpoint}`);

    // Extract the Price Rule ID from the redirect URL
    const redirectUrlParts = redirectUrl.split('/');
    const priceRuleIndex =
      redirectUrlParts.findIndex((el) => el === 'price_rules') + 1;
    const priceRuleId = redirectUrlParts[priceRuleIndex];

    // Use the Price Rule ID to fetch the Price Rule
    const priceRuleEndpoint = `https://${MYSHOPIFY_DOMAIN}/admin/api/2021-01/price_rules/${priceRuleId}.json`;
    const priceRule = await fetch(priceRuleEndpoint, {
      headers: {
        'X-Shopify-Access-Token': SHOPIFY_ADMIN_PASSWORD,
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json().then((data) => data.price_rule));

    return {
      statusCode: 200,
      body: JSON.stringify(priceRule),
      headers: { 'content-type': 'application/json' }
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.message
    };
  }
};
