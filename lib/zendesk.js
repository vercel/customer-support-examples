import React from 'react'

class Zendesk extends React.Component {
  constructor(props) {
    super(props)
    this.insertScript = this.insertScript.bind(this)
  }

  insertScript() {
    const script = document.createElement('script')
    script.async = true
    script.id = 'ze-snippet'
    script.src = `https://static.zdassets.com/ekr/snippet.js?key=${ZENDESK_ID}`
    document.body.appendChild(script)
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

export default Zendesk
