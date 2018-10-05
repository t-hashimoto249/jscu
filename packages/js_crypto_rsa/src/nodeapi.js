/**
 * nodeapi.js
 */

import params from './params.js';
import keyutil from 'js-crypto-key-utils/dist/index.js';
import jseu from 'js-encoding-utils';
import * as oaep from './oaep.js';

// TODO: Currently not implemented in Node.js. Will be available from Node.js v10.12.0.
export function generateKey(modulusLength = 2048, publicExponent = new Uint8Array([0x01, 0x00, 0x01]), nodeCrypto){
  throw new Error('CurrentlyNodeKeyGenIsUnsupported');
}

export function sign(msg, privateJwk, hash = 'SHA-256', algorithm = {name: 'RSA-PSS', saltLength: 192}, nodeCrypto) {
  const privatePem = keyutil.fromJwkTo('pem', privateJwk, 'private', {compact: false});
  const sign = nodeCrypto.createSign(params.hashes[hash].nodeName);
  sign.update(msg);
  const key = Object.assign(
    {key: privatePem},
    (algorithm.name === 'RSA-PSS')
      ? {saltLength: algorithm.saltLength, padding: nodeCrypto.constants.RSA_PKCS1_PSS_PADDING}
      : {});
  return new Uint8Array(sign.sign(key));
}

export function verify(msg, signature, publicJwk, hash = 'SHA-256', algorithm = {name: 'RSA-PSS', saltLength: 192}, nodeCrypto) {
  const publicPem = keyutil.fromJwkTo('pem', publicJwk, 'public', {compact: false});
  const verify = nodeCrypto.createVerify(params.hashes[hash].nodeName);
  verify.update(msg);
  const key = Object.assign(
    {key: publicPem},
    (algorithm.name === 'RSA-PSS')
      ? {saltLength: algorithm.saltLength, padding: nodeCrypto.constants.RSA_PKCS1_PSS_PADDING}
      : {});
  return verify.verify(key, signature);
}


export async function encrypt(msg, publicJwk, hash = 'SHA-256', label = new Uint8Array([]), nodeCrypto){
  const publicPem = keyutil.fromJwkTo('pem', publicJwk, 'public', {compact: false});

  let encrypted;
  if(hash === 'SHA-1') {
    encrypted = nodeCrypto.publicEncrypt({key: publicPem, padding: nodeCrypto.constants.RSA_PKCS1_OAEP_PADDING}, msg);
  } else {
    // https://tools.ietf.org/html/rfc3447
    const em = await oaep.emeOaepEncode(msg, label, jseu.encoder.decodeBase64Url(publicJwk.n).length, hash);
    encrypted = nodeCrypto.publicEncrypt({key: publicPem, padding: nodeCrypto.constants.RSA_NO_PADDING}, em);
  }
  return new Uint8Array(encrypted);
}

export async function decrypt(data, privateJwk, hash = 'SHA-256', label = new Uint8Array([]), nodeCrypto){
  const privatePem = keyutil.fromJwkTo('pem', privateJwk, 'private', {compact: false});
  let decrypted;
  if(hash === 'SHA-1') {
    decrypted = nodeCrypto.privateDecrypt({key: privatePem, padding: nodeCrypto.constants.RSA_PKCS1_OAEP_PADDING}, data);
  } else {
    // https://tools.ietf.org/html/rfc3447
    const em = nodeCrypto.privateDecrypt({key: privatePem, padding: nodeCrypto.constants.RSA_NO_PADDING}, data);
    decrypted = await oaep.emeOaepDecode(new Uint8Array(em), label, jseu.encoder.decodeBase64Url(privateJwk.n).length, hash);
  }
  return new Uint8Array(decrypted);
}

