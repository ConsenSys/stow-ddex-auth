module.exports = Profile => async (req, res) => {
  const { address } = req.params;

  const profile = await Profile.findOne({
    where : {
      address: address.toLowerCase(),
    },
  });

  if (profile) {
    res.status(200).json(profile);
  } else {
    res.status(404).send('No profile found for that address.');
  }
};
