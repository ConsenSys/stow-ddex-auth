module.exports = Profile => async (req, res) => {
  const { address } = req;
  const profile = await Profile.findOne({ where: { address }});

  if (!profile) {
    return res.status(404).send('User not found.');
  }

  if (req.body.address) {
    return res.status(400).send('Cannot update address');
  }

  try {
    await profile.update(req.body);
  } catch (e) {
    if (e.errors[0] && e.errors[0].path === 'email') {
      return res.status(409).send('conflict-email');
    } else {
      return res.status(400).send('Request body was malformed.');
    }
  }

  res.status(204).send('Profile created!');
};
