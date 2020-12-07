import Multipassify from 'multipassify';

export async function handler(event, _context, _callback) {
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
      body: JSON.stringify(multipassUrl)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(`Could not generate Multipass URL: ${err.message}`)
    };
  }
}
