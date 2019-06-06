import Link from 'next/link'
import withApp from '../components/with-page'
import Title from '../components/title'
import Button from '../components/button'
import DriftLogo from '../components/drift-logo'

const Logo = <DriftLogo />
function Index() {
  return (
    <main>
      <div className="container">
        <Title appName="Drift" appLogo={Logo} />
        <Button appName="drift" />
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

export default withApp(Index)
