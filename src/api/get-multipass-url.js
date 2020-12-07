import Multipassify from 'multipassify';

/**
 * Use the multipassify package to generate a Multipass login URL
 * @param {Object} req  - HTTP request object (see https://vercel.com/docs/runtimes#official-runtimes/node-js/node-js-request-and-response-objects/node-js-helpers)
 * @param {Object} req.body - HTTP request body
 * @param {Object} req.body.customerData - Customer data object
 * @param {Object} req.body.customerData.email - the customer's email address
 * @param {Object} req.body.customerData.return_to - the URL that the customer should be directed to after login
 * @param {Object} res - HTTP response object (see https://vercel.com/docs/runtimes#official-runtimes/node-js/node-js-request-and-response-objects/node-js-helpers)
 */
export default function (req, res) {
  try {
    const requiredVars = ['MYSHOPIFY_DOMAIN', 'SHOPIFY_MULTIPASS_SECRET'];

    // // Check that the variables used in this function have been provided
    // requiredVars.forEach((envVar) => {
    //   if (!process.env[envVar]) {
    //     res
    //       .status(400)
    //       .send(`'${envVar}' is required by /api/get-multipass-url`);
    //   }
    // });

    const { MYSHOPIFY_DOMAIN, SHOPIFY_MULTIPASS_SECRET } = process.env;
    const { customerData } = JSON.parse(req.body);

    // // Check that the variables used in this function have been provided
    // ['email', 'return_to'].forEach((param) => {
    //   if (!customerData[param]) {
    //     res
    //       .status(400)
    //       .send(
    //         `'customerData.${param}' is required by /api/get-multipass-url`
    //       );
    //   }
    // });

    const multipassify = new Multipassify(SHOPIFY_MULTIPASS_SECRET);
    console.log(`DOMAIN: ${MYSHOPIFY_DOMAIN}`);
    console.log(`CUSTOMER DATA:: ${JSON.stringify(req.body, null, 2)}`);
    const url = multipassify.generateUrl(customerData, MYSHOPIFY_DOMAIN);
    res.status(200).send(url);
  } catch (err) {
    res.status(500).send(err);
  }
}