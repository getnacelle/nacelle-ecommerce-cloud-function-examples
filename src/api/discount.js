import fetch from 'node-fetch';

/**
 * Fetch the Price Rule associated with a Discount Code using the Shopify Storefront API
 * @param {Object} req  - HTTP request object (see https://vercel.com/docs/runtimes#official-runtimes/node-js/node-js-request-and-response-objects/node-js-helpers)
 * @param {Object} req.body - HTTP request body
 * @param {Object} req.body.discountCode - Discount code for which we need to look up the associated Price Rule
 * @param {Object} res - HTTP response object (see https://vercel.com/docs/runtimes#official-runtimes/node-js/node-js-request-and-response-objects/node-js-helpers)
 */
export default async function (req, res) {
  try {
    const { MYSHOPIFY_DOMAIN, SHOPIFY_ADMIN_PASSWORD } = process.env;
    const { discountCode } = JSON.parse(req.body);

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

    res.status(200).send(priceRule);
  } catch (err) {
    res.status(500).send(`Could not fetch discount price rule: ${err.message}`);
  }
}
