# Nacelle eCommerce Cloud Function Examples

[![Netlify Status](https://api.netlify.com/api/v1/badges/328e7f2d-e20d-4d02-9c3d-005686fd220f/deploy-status)](https://app.netlify.com/sites/nacelle-ecommerce-cloud-functions-examples/deploys)

_A collection of example cloud functions that add functionality to your eCommerce storefront_

## Quick Links

- https://nacelle-ecommerce-cloud-function-examples.vercel.app
- https://nacelle-ecommerce-cloud-functions-examples.netlify.app
- [Vercel Serverless Functions docs](https://vercel.com/docs/serverless-functions/introduction)
- [Netlify Functions docs](https://docs.netlify.com/functions/overview/)
- [Nacelle Docs](https://docs.getnacelle.com/)

## Motivation

While a majority of your JAMstack eCommerce site can be built with data sourced at build time, sometimes you need to make client-side API calls to fetch data in response to user interaction. While you are free to make client-side requests directly from your web app (e.g. with [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)), this isn't a good option when:

- The API you're calling requires a secret token which isn't safe to expose to the public by referencing it in your front-end code (for example, the [Shopify Admin API](https://shopify.dev/docs/admin-api))
- The API you're calling has [CORS settings](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) which prevent client-side requests

While it's possible to proxy API requests through a server, front-end developers seldom want to deal with the hassle, maintenance, security concerns, and scaling issues related to maintaining a server. Instead, we can rely on [serverless computing](https://en.wikipedia.org/wiki/Serverless_computing) to run back-end code without worrying about provisioning and maintaining infrastructure.

## Cloud Function Platforms

This repo demonstrates the use of Cloud Functions (aka Serverless Functions) to tackle common problems in headless Shopify builds. Of the many cloud function providers, we're quick to recommend both [Vercel Serverless Functions](https://vercel.com/docs/serverless-functions/introduction) and [Netlify Functions](https://www.netlify.com/products/functions/) because they require little-to-no configuration and offer a slick developer experience.

### Vercel

[Vercel Serverless Functions](https://vercel.com/docs/serverless-functions/introduction) offer a [Node.js Runtime](https://vercel.com/docs/runtimes#official-runtimes/node-js) and support [ESModule imports / exports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), allowing you to write modern JavaScript in your functions. They also offer [Node Helpers](https://vercel.com/docs/runtimes#official-runtimes/node-js/node-js-request-and-response-objects) which simplify common tasks such as sending / receiving text and JSON. You also have the option of writing Vercel Serverless Functions [in TypeScript](https://vercel.com/docs/runtimes#official-runtimes/node-js/using-type-script-with-the-node-js-runtime). You can run functions locally via the [Vercel CLI](https://vercel.com/docs/cli).

The example project is deployed on Vercel at https://nacelle-ecommerce-cloud-function-examples.vercel.app.

### Netlify

[Netlify Functions](https://www.netlify.com/products/functions/) offer a [Node.js Runtime](https://docs.netlify.com/functions/build-with-javascript/#synchronous-function-format) which provides a helpful abstraction of AWS Lambda. Netlify Functions are written with [CommonJS](https://flaviocopes.com/commonjs/) syntax, and have a straightforward structure which allows you to explcitly set the `body` and `headers` of the function's [`response`](https://developer.mozilla.org/en-US/docs/Web/API/Response). You can run functions locally via the [Netlify CLI](https://docs.netlify.com/cli/get-started/).

The example project is deployed on Netlify at https://nacelle-ecommerce-cloud-functions-examples.netlify.app.

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

When running the project using the Vercel CLI or Netlify CLI (see [**Quick Start**](##quick-start)), the functions will be available at the same address (`/api/function-name`) and will return the same outputs regardless of whether or not they are Vercel or Netlify functions.

## Quick Start

Install dependencies:

```
npm i
```

Create `src/.env` and add the following environment variables from your Shopify Plus store:

```dotenv
SHOPIFY_ADMIN_PASSWORD=my-shopify-admin-password
SHOPIFY_MULTIPASS_SECRET=my-shopify-multipass-secret # see https://shopify.dev/docs/admin-api/rest/reference/plus/multipass
MYSHOPIFY_DOMAIN=example.myshopify.com
```

Run the example site with the platform of your choosing:

```
npm run dev:vercel # run using the Vercel CLI

npm run dev:netlify # run using the Netlify CLI
```

## Functions Glossary

### `/discount`

This endpoint demonstrates fetching the [Price Rule](https://shopify.dev/docs/admin-api/rest/reference/discounts/pricerule) information associated with a Shopify discount code. This function could be used to determine how a product's displayed price needs to change when a user applies a certain discount code.

Key concepts:

- Keeping a sensitive environment variable (Shopify Admin password) out of client-side code

### `/multipass-url`

This endpoint demonstrates abstracting the [`multipassify`](https://www.npmjs.com/package/multipassify) package to product a URL that a customer can be redirected to in order to log in with [Shopify Multipass](https://shopify.dev/docs/admin-api/rest/reference/plus/multipass).

Key concepts:

- Keeping a sensitive environment variable (Shopify Multipass token) out of client-side code
- Abstracting a package to reduce a site's bundle size (Webpack creates enormous bundles when bundling a site which depends on `multipassify`)

### `/api/countries` and `/api/provinces`

These functions don't use any sensitive environment variables, and they don't circumvent CORS restrictions on a remote API. But they do abstract a rather large package [`countrycitystatejson`](https://www.npmjs.com/package/countrycitystatejson) which, if included in your site's bundle, would increase the bundle size by [~500 kB](https://bundlephobia.com/result?p=countrycitystatejson). Since this package is useful for account pages (e.g. to set a customer's shipping address) but isn't going to be used by most of a site's visitors, abstracting this package into a serverless endpoint that can be called on-demand helps us keep our site's bundle slim.

Key concepts:

- Abstracting a package to reduce a site's bundle size
