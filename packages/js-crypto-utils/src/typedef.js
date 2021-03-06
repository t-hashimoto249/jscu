/**
 * typedef.js
 */

/**
 * @typedef {Object} PKCCiphertextObject - Ciphertext of public key encryption.
 * @property {Uint8Array} data - Encrypted message body.
 * @property {Uint8Array} [salt] - Active only for ECDH+AES
 * @property {Uint8Array} [iv] - Active only for ECDH+AES
 */

/**
 * @typedef {Object} ECKeyGenerationOption - Options for EC key generation.
 * @property {String} [namedCurve='P-256'] - Name of elliptic curve like 'P-256'.
 */

/**
 * @typedef {Object} RSAKeyGenerationOption - Options for RSA key generation.
 * @property {Number} [modulusLength=2048] - Modulus length in bit.
 * @property {Uint8Array} [publicExponent=new Uint8Array([0x01, 0x00, 0x01])] - Public exponent.
 */

/**
 * @typedef {Object} ECSigningOption - Options for EC key signing.
 * @property {'raw'|'der'} format - EC Signature format in DER or Raw.
 */

/**
 * @typedef {Object} RSASigningOption - Options for RSA key signing.
 * @property {'RSA-PSS'|'RSASSA-PKCS1-v1_5'} [name='RSA-PSS'] - 'RSA-PSS' or  'RSASSA-PKCS1-v1_5'.
 * @property {Number} [saltLength] - For RSA-PSS, this must be specified.
 */

/**
 * @typedef {Object} ECEncryptionOptions - Options for ECDH+AES encryption.
 * @property {Key} privateKey - Private Key Object for ECDH.
 * @property {String} [hash='SHA-256'] - Name of hash algorithm like 'SHA-256'
 * @property {String} [encrypt='AES-GCM'] - Name of encryption algorithm like AES-GCM after ECDH.
 * @property {Number} [keyLength=32] - Key length for AES in octet.
 * @property {Uint8Array|null} [iv=null] - Initial vector for AES-GCM.
 * @property {String} [info=''] - Info for AES-GCM.
 */

/**
 * @typedef {Object} ECDecryptionOptions - Options for ECDH+AES decryption.
 * @property {Key} publicKey - Public Key Object for ECDH.
 * @property {String} [hash='SHA-256'] - Name of hash algorithm like 'SHA-256'
 * @property {String} [encrypt='AES-GCM'] - Name of encryption algorithm like AES-GCM after ECDH.
 * @property {Number} [keyLength=32] - Key length for AES in octet.
 * @property {Uint8Array|null} [iv=null] - Initial vector for AES-GCM.
 * @property {String} [info=''] - Info for AES-GCM.
 */

/**
 * @typedef {Object} RSAEncryptionOption - Options for RSA-OAEP encryption.
 * @property {String} [hash='SHA-256'] - Name of hash algorithm like 'SHA-256'
 * @property {Uint8Array} [label=new Uint8Array([])] - RSA-OAEP label.
 */