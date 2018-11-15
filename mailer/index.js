const AWS = require('aws-sdk');
const templates = require('./templates');

AWS.config.update({
  region: 'us-east-1'
});

const Source = 'alfred@stow-protocol.com';

const sendMail = (toAddress, templateName, params) => {
  const ses = new AWS.SES();
  const template = templates[templateName];

  return ses.sendEmail({
    Destination: {
      ToAddresses: [toAddress]
    },
    Source,
    ...template(params),
  }).promise();
};

module.exports = { sendMail };
