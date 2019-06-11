import Link from 'next/link'
import withApp from '../components/with-page'
import Title from '../components/title'
import Button from '../components/button'
import ChatlioLogo from '../components/chatlio-logo'

const Logo = <ChatlioLogo />
function Chatlio() {
  return (
    <main>
      <div className="container">
        <Title appName="Chatlio" appLogo={Logo} />
        <Button appName="chatlio" />
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

export default withApp(Chatlio)
