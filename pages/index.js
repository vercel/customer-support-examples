import Link from 'next/link'
import withApp from '../components/with-page'
import Title from '../components/title'
import Button from '../components/button'

function Index() {
  return (
    <main>
      <div className="container">
        <Title />
        <Button appName="intercom" />
      </div>
    </main>
  )
}

export default withApp(Index)
