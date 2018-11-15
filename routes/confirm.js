module.exports = Profile => async (req, res) => {
  const { activationCode } = req.params;

  if (!activationCode) {
    return res.status(400).send('No activation hash found.');
  }

  const profile = await Profile.findOne({
    where: {
      activationCode,
    }
  });

  if (!profile) {
    return res.status(404).send('No profile found.');
  }

  if (profile.isActive) {
    return res.status(409).send('Profile already active.');
  }

  try {
    await profile.update({ isActive: true });
  } catch (e) {
    return res.status(500).send('Something went wrong. Please try again later.');
  }

  res.status(204).send('Profile successfully activated.');
};
