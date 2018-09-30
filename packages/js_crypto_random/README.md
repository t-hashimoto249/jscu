Universal Module for Secure Random Generator in JavaScript
--
[![CircleCI](https://circleci.com/gh/junkurihara/js-crypto-random.svg?style=svg)](https://circleci.com/gh/junkurihara/js-crypto-random)

> **WARNING**: At this time this solution should be considered suitable for research and experimentation, further code and security review is needed before utilization in a production application.

# Introduction and Overview
This library is designed to be 'universal' as a random sequence generator, i.e., it works both on most browsers and on Node.js just by importing from npm/source code. Note that in the design principle, the library fully utilizes native APIs like WebCrypto API to accelerate its operation if available. 

# Installation
At your project directory, do either one of the following.

- From npm/yarn:
  ```shell
  $ npm install --save js-crypto-random // npm
  $ yarn add js-crypto-random // yarn
  ```
- From GitHub:
  ```shell
  $ git clone https://github.com/junkurihara/js-crypto-random.git
  ```

Then you should import the package as follows.
```shell
import random from 'js-crypto-random'; // for npm
import random from 'js-crypto-random/dist/index.js'; // for github
```
  
# Usage
## Generate random byte sequence
```javascript
random.getRandomBytes(32).then( (rb) => {
  // now you get an Uint8Array of 32 bytes filled with randomly generated values
});
```

## Generate random ascii sequence
```javascript
random.getRandomAsciiString(32)( (ra) => {
  // now you get a string of 32 ASCII characters generated in a cryptographically random manner
});
```

## How to bundle scripts importing this module via Webpack
When you bundle files importing this module via Webpack for web, the bundler tries to simultaneously bundle modules that are compatible to some native modules of Node.js, i.e., those in`node-libs-browser` module. But this module automatically chooses the native `crypto` module in Node.js and `crypto.subtle` of Web API in browsers by checking its running environment, and hence the bundled modules of `node-libs-browser` are redundant. From this observation, you should exclude them wen you create bundle scripts importing this module. In particular, the `externals` option of `webpack.config.js` is useful as follows.
```javascript
{
  externals: {
    'crypto': true
  }
}
```  

# License
Licensed under the MIT license, see `LICENSE` file.