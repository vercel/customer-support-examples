const env = {
  INTERCOM_ID: process.env.INTERCOM_ID || null,
}

module.exports = {
  presets: ['next/babel'],
  plugins: [['transform-define', env]],
}
