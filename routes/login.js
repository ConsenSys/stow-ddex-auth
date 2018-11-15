module.exports = (req, res) => {
  const { profile } = req;
  res.status(200).json(profile);
};
