# Coolfinder
Finds cool products on Etsy!

## Description
Coolfinder finds the top 25 US products for a given search term on Etsy. 

### Assumptions
- Users are searching for cool products.
- There can't be more than 25 cool products for any give search. Cool products would NEVER be on page 2 of a search.
- The coolest products are the first 25 products returned by Etsy. A more robust method of determining coolness might be based on a weigthed average of views, rating and interest.
- The user is US based so only US products are returned.
- The user is primarily interested in the name, description and price of a given product. A link is provided to the full product detail for more information.

### Approach
Coolfinder was developed using a vanilla JS seed for flexibility and simplicity. All code is located in the index.js file for simplicity as well. A larger project would benefit from a modular approach, but ultimately I decided that would be unnecessary for Coolfinder.

### Usage
Coolfinder was built using [webpack](https://webpack.js.org/) and [yarn](https://yarnpkg.com/en/) from the [Webpack ES6 Seed](https://github.com/willtpwise/webpack-seed). To use Coolfinder please do the following:

1. If you haven't got it, install yarn. [Yarn installation instructions](https://yarnpkg.com/en/docs/install#mac-stable).
2. run `yarn install` to get Coolfinder dependencies.
3. run `yarn build` to generate a distributable found in the `/dist` directory.
4. Point your favorite web server at `/dist` or copy the files to the directory of your choice.

#### Preferred Browser
Coolfinder looks best in Chrome.