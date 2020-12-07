# Nacelle eCommerce Cloud Function Examples

_A collection of example cloud functions that add functionality to your eCommerce storefront_

## Motivation

While a majority of your JAMstack eCommerce site can be built with data sourced at build time, sometimes you need to make client-side API calls to fetch data in response to user interaction. While you are free to make client-side requests directly from your web app (e.g. with [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)), this isn't a good option when:

- The API you're calling requires a secret token which isn't safe to expose to the public by referencing it in your front-end code (for example, the [Shopify Admin API](https://shopify.dev/docs/admin-api))
- The API you're calling has [CORS settings](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) which prevent client-side requests

While it's possible to proxy API requests through a server, front-end developers seldom want to deal with the hassle, maintenance, security concerns, and scaling issues related to maintaining a server. Instead, we can rely on [serverless computing](https://en.wikipedia.org/wiki/Serverless_computing) to run back-end code without worrying about provisioning and maintaining infrastructure.

## Cloud Function Platforms

This repo demonstrates the use of Cloud Functions (aka Serverless Functions) to tackle common problems in headless Shopify builds. Of the many cloud function providers, we're quick to recommend both [Vercel Serverless Functions](https://vercel.com/docs/serverless-functions/introduction) and [Netlify Functions](https://www.netlify.com/products/functions/) because they require little-to-no configuration and are easy to use.

## Project Structure

Example cloud functions are organized by platform:

```tree
.
└── src
    ├── api (Vercel Serverless Functions)
    │   └── *.js
    │
    ├── functions (Netlify Functions)
    │   └── *.js
    │
    └── index.* (basic site to demonstrate function responses)
```
