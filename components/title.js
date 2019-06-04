import Logo from './logo'
import IntercomLogo from './intercom-logo'
const Title = ({ appName = ' Intercom', AppLogo = <IntercomLogo /> }) => (
  <div className="title">
    <div className="logos">
      <Logo /> <span>+</span> {AppLogo}
    </div>
    <h1>
      Chat with Us on &nbsp; <b>{appName}</b>
    </h1>
    <style jsx>{`
      .title {
        width: 100%;
        max-width: 800px;
        margin: auto;
      }
      .logos {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
      }
      .logos span {
        font-weight: 200;
        font-size: 80px;
        line-height: 100%;
        color: var(--grey-1);
        padding: 0 40px;
      }
      .title h1 {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        font-size: 36px;
        line-height: 100%;
        font-weight: 600;
        color: var(--black);
      }
      .title h1 b {
        font-weight: 800;
      }

      @media (max-width: 700px) {
        .logos :global(svg) {
          height: 56px;
          width: auto;
        }
        .logos span {
          font-size: 56px;
        }
        .title h1 {
          font-size: 28px;
        }
      }
    `}</style>
  </div>
)

export default Title
