import Link from 'next/link'
import withApp from '../components/with-page'
import Title from '../components/title'
import Button from '../components/button'
import CrispLogo from '../components/crisp-logo'

const Logo = <CrispLogo />
function Crisp() {
  return (
    <main>
      <div className="container">
        <Title appName="Crisp" appLogo={Logo} />
        <Button appName="crisp" />
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

export default withApp(Crisp)
