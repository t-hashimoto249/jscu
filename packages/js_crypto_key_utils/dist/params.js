"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlgorithmFromOid = getAlgorithmFromOid;
exports.default = void 0;

/**
 * params.js
 */
var _default = {
  // oid is referred to rfc5480 https://www.ietf.org/rfc/rfc5480.txt
  namedCurves: {
    'P-256': {
      indutnyName: 'p256',
      payloadSize: 32,
      oid: [1, 2, 840, 10045, 3, 1, 7]
    },
    'P-384': {
      indutnyName: 'p384',
      payloadSize: 48,
      oid: [1, 3, 132, 0, 34]
    },
    'P-521': {
      indutnyName: 'p521',
      payloadSize: 66,
      oid: [1, 3, 132, 0, 35]
    },
    'P-256K': {
      indutnyName: 'secp256k1',
      payloadSize: 32,
      oid: [1, 3, 132, 0, 10]
    }
  },
  // https://tools.ietf.org/html/rfc3279
  publicKeyAlgorithms: {
    'EC': {
      oid: [1, 2, 840, 10045, 2, 1]
    },
    'RSA': {
      oid: [1, 2, 840, 113549, 1, 1, 1]
    }
  }
};
exports.default = _default;

function getAlgorithmFromOid(oid, oidDict) {
  return Object.keys(oidDict).filter(function (k) {
    return oidDict[k].oid.toString() === oid.toString();
  });
}