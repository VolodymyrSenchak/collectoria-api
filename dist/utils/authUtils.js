"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOAuthHeader = generateOAuthHeader;
const crypto_1 = __importDefault(require("crypto"));
function percentEncode(str) {
    return encodeURIComponent(str)
        .replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase());
}
function generateOAuthHeader(method, url, consumerKey, consumerSecret, token, tokenSecret) {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const nonce = crypto_1.default.randomBytes(16).toString('hex');
    const params = {
        oauth_consumer_key: consumerKey,
        oauth_token: token,
        oauth_nonce: nonce,
        oauth_timestamp: timestamp,
        oauth_signature_method: 'HMAC-SHA1',
        oauth_version: '1.0',
    };
    const baseParams = Object.keys(params)
        .sort()
        .map((key) => `${percentEncode(key)}=${percentEncode(params[key])}`)
        .join('&');
    const baseString = [
        method.toUpperCase(),
        percentEncode(url),
        percentEncode(baseParams),
    ].join('&');
    const signingKey = `${percentEncode(consumerSecret)}&${percentEncode(tokenSecret)}`;
    const signature = crypto_1.default
        .createHmac('sha1', signingKey)
        .update(baseString)
        .digest('base64');
    const authHeader = `OAuth ${Object.entries(Object.assign(Object.assign({}, params), { oauth_signature: signature }))
        .map(([k, v]) => `${percentEncode(k)}="${percentEncode(v)}"`)
        .join(', ')}`;
    return authHeader;
}
//# sourceMappingURL=authUtils.js.map