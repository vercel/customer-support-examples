import Link from 'next/link'
import withApp from '../components/with-page'
import Title from '../components/title'
import Button from '../components/button'

function Index() {
  return (
    <main>
      <div className="container">
        <Title />
        <Button />
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
