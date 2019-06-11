import React from 'react'

class Chatlio extends React.Component {
  constructor(props) {
    super(props)
    this.insertScript = this.insertScript.bind(this)
  }

  insertScript() {
    const script = document.createElement('script')
    script.innerText = `window._chatlio = window._chatlio||[];
    !function(){ var t=document.getElementById("chatlio-widget-embed");if(t&&window.ChatlioReact&&_chatlio.init)return void _chatlio.init(t,ChatlioReact);for(var e=function(t){return function(){_chatlio.push([t].concat(arguments)) }},i=["configure","identify","track","show","hide","isShown","isOnline", "page", "open", "showOrHide"],a=0;a<i.length;a++)_chatlio[i[a]]||(_chatlio[i[a]]=e(i[a]));var n=document.createElement("script"),c=document.getElementsByTagName("script")[0];n.id="chatlio-widget-embed",n.src="https://w.chatlio.com/w.chatlio-widget.js",n.async=!0,n.setAttribute("data-embed-version","2.3");
       n.setAttribute('data-widget-id', '${CHATLIO_ID}' );
       c.parentNode.insertBefore(n,c);
    }()`
    script.async = true
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

export default Chatlio
