const env = {
  INTERCOM_ID: process.env.INTERCOM_ID || null,
  DRIFT_ID: process.env.DRIFT_ID || null,
  ZENDESK_ID: process.env.ZENDESK_ID || null,
  CHATLIO_ID: process.env.CHATLIO_ID || null,
}

module.exports = {
  presets: ['next/babel'],
  plugins: [['transform-define', env]],
}
