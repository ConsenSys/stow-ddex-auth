module.exports = Profile => async (req, res, next) => {
  const { address } = req;

  const profile = await Profile.findOne({
    where: {
      address,
      isActive: true,
    }
  });

  if (!profile || !profile.isActive) {
    return res.status(401).send('No user found.')
  }

  req.profile = profile;

  next();
};


