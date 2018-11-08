const ethUtil = require("ethereumjs-util");
const sigUtil = require("eth-sig-util");

const data = ethUtil.bufferToHex(new Buffer('By signing that you accept our terms and conditions and you understand that Stow and all the related entities have no responsibilities on your private key, your eth, or your tokens.', 'utf8'));

module.exports = (req, res, next) => {
  const sig = req.headers['eth-signature'];
  const sigAddress = req.headers['eth-address'];

  if (!sig) {
    return res.status(403).send('No signature was found with request.');
  }
  const personalSignature = { data, sig };
  const address = sigUtil.recoverPersonalSignature(personalSignature);

  if (address !== sigAddress.toLowerCase()) {
    return res.status(403).send('Signature does not match provided address');
  }

  /* @dex add verified, lowercase address to request object to be consumed */
  req.address = address;

  next();
};
