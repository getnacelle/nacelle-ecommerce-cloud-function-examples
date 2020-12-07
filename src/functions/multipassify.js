const Multipassify = require("multipassify")

exports.handler = async function(event, context, callback) {
  const { multipassSecret, customerData, myshopifyDomain } = JSON.parse(
    event.body
  )
  const multipassify = new Multipassify(multipassSecret)
  const multipassUrl = multipassify.generateUrl(customerData, myshopifyDomain)

  if (multipassUrl) {
    return {
      statusCode: 200,
      body: JSON.stringify(multipassUrl)
    }
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify("Could not generate Multipass URL")
    }
  }
}
