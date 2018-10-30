const ethUtil = require("ethereumjs-util");
const sigUtil = require("eth-sig-util");

const data = ethUtil.bufferToHex(new Buffer('By signing that you accept our terms and conditions and you understand that Stow and all the related entities have no responsibilities on your private key, your eth, or your tokens.', 'utf8'));

module.exports = Profile => async (req, res) => {
	const sig = req.headers['eth-signature'];

  if (!sig) {
    return res.status(400).send('No signature was found with request.');
  }
	const personalSignature = { data, sig };
	const address = sigUtil.recoverPersonalSignature(personalSignature);
	const profile = await Profile.findOne({ where: { address }});

  if (profile) {
    return res.status(409).send('conflict-address');
  }

  try {
    await Profile.create(Object.assign(req.body, { address }));
  } catch (e) {
    if (e.errors[0] && e.errors[0].path === 'email') {
      return res.status(409).send('conflict-email');
    } else {
      return res.status(400).send('Request body was malformed.');
    }
  }

  res.status(204).send('Profile created!');
};
