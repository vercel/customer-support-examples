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
    script.src =
      'https://static.zdassets.com/ekr/snippet.js?key=75aa0f4f-e6e1-4553-a166-da8d401e50dc'
    document.body.appendChild(script)
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.insertScript()
      console.log('hhhh')
    }
  }

  render() {
    return <div />
  }
}

export default Zendesk
