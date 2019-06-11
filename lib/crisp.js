import React from 'react'

class Crisp extends React.Component {
  constructor(props) {
    super(props)
    this.insertScript = this.insertScript.bind(this)
  }

  insertScript() {
    window.$crisp = []
    window.CRISP_WEBSITE_ID = `${CRISP_ID}`
    ;(function() {
      var d = document
      var s = d.createElement('script')
      s.src = 'https://client.crisp.chat/l.js'
      s.async = 1
      d.getElementsByTagName('head')[0].appendChild(s)
    })()
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.insertScript()
    }
  }

  render() {
    return <div />
  }
}

export default Crisp
