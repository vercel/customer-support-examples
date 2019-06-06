import Link from 'next/link'
import withApp from '../components/with-page'
import Title from '../components/title'
import Button from '../components/button'
import ZendeskLogo from '../components/zendesk-logo'

const Logo = <ZendeskLogo />
function Zendesk() {
  return (
    <main>
      <div className="container">
        <Title appName="Zendesk" appLogo={Logo} />
        <Button appName="zendesk" />
      </div>
      <style jsx>{`
        main {
          display: flex;
          height: 100vh;
          width: 100vw;
        }
        .container {
          margin: auto;
        }
      `}</style>
    </main>
  )
}

export default withApp(Zendesk)
