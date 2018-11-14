const getBaseUrl = params => {
  switch (process.env.STOW_ENV) {
    case 'qastg':
      return 'https://qastg.exchange.stow-protocol.com';
    default:
      return 'http://localhost:3000'
  }
}

const emailConfirmation = params => {
  const url = `http://localhost:3000/verify?activationCode=${params.activationCode}`;

  return {
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `Thanks for signing up for Stow Exchange. Please click this link to confirm your account. <a href="${url}" target="_blank">Confirm Account</a>.`
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Stow Exchange: Confirm Your Account"
      }
    },
  };
};

module.exports = emailConfirmation;

