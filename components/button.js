import LoadingDots from './loading-dots'
import useTalkToUs from '../lib/use-talk-to-us'
const Button = () => {
  const { preload, show, loading, component } = useTalkToUs()
  return (
    <div className="btn-wrapper">
      <a
        className={loading ? 'button disabled' : 'button'}
        onMouseEnter={preload}
        onClick={show}
      >
        {loading ? <LoadingDots /> : "Let's Start"}
      </a>
      {component}
      <style jsx>
        {`
          .btn-wrapper {
            width: 100%;
            max-width: 800px;
            height: 120px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
          }

          .button {
            appearance: none;
            position: relative;
            display: inline-block;
            vertical-align: middle;

            text-transform: uppercase;
            text-align: center;
            text-decoration: none;
            line-height: 38px;
            white-space: nowrap;

            min-width: 200px;
            height: 40px;
            padding: 0 25px 0 25px;
            font-weight: 500;
            border-radius: 5px;
            font-size: 12px;
            flex-shrink: 0;

            color: var(--white);
            background-color: var(--black);
            border: 1px solid var(--black);

            transition: all 0.2s ease;
            user-select: none;
            cursor: pointer;
            overflow: hidden;
            outline: none;
          }

          .button.shadow {
            font-weight: 400;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
          }

          .button .text {
            position: relative;
            z-index: 1;
          }

          .button:hover {
            color: var(--black);
            background: var(--white);
          }

          .button.shadow:hover {
            box-shadow: 0 7px 20px rgba(0, 0, 0, 0.16);
            transform: translate3d(0px, -1px, 0px);
          }

          .button.disabled {
            background: var(--grey-4);
            border-color: var(--grey-3);
            color: var(--grey-1);
            cursor: not-allowed;
            filter: grayscale(1);
          }

          .button.disabled.shadow:hover {
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
            transform: unset;
          }

          .button.loading {
            background: var(--grey-4);
            border-color: var(--grey-3);
            color: var(--grey-1);
            cursor: default;
            pointer-events: none;
          }
        `}
      </style>
    </div>
  )
}
export default Button
