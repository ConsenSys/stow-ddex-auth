const mailer = require('./../mailer');

module.exports = Profile => async (req, res) => {
  const { address } = req;
	const profile = await Profile.findOne({ where: { address }});

  if (profile) {
    return res.status(409).send('conflict-address');
  }

  let newProfile;

  try {
    newProfile = await Profile.create(Object.assign(req.body, { address }));
  } catch (e) {
    if (e.errors[0] && e.errors[0].path === 'email') {
      return res.status(409).send('conflict-email');
    } else {
      return res.status(400).send('Request body was malformed.');
    }
  }

  try {
    await mailer.sendMail(newProfile.email, 'emailConfirmation', newProfile);
  } catch(e) {
    console.log(e);
  }

  res.status(204).send('Profile created!');
};
