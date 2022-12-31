import classNames from 'classnames'
import { useRef, useState } from 'react'

const Accordion = (props) => {
  const [showItem, setShowItem] = useState<null | number>(null)
  const oneAccordion = useRef(null)
  const towAccordion = useRef(null)
  const hItemOne = () => {
    if (showItem === 1)
      return oneAccordion.current.getBoundingClientRect().height
    return 0
  }
  const hItemTow = () => {
    if (showItem === 2)
      return towAccordion.current.getBoundingClientRect().height
    return 0
  }
  return (
    <div className="accordion accordion-flush">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className={classNames(
              'accordion-button',
              !(showItem === 1) ? 'collapsed' : ''
            )}
            type="button"
            onClick={() => {
              if (showItem === 1) setShowItem(null)
              else setShowItem(1)
            }}
          >
            {props.title.one}
          </button>
        </h2>
        <div
          className="accordion-collapse overflow-hidden h-0 accordion_transition"
          style={{ height: `calc(${hItemOne()}px - 1rem)` }}
        >
          <div className="accordion-body" ref={oneAccordion}>
            <p dir="auto">{props.di.one}</p>
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            type="button"
            className={classNames(
              'accordion-button',
              !(showItem === 2) ? 'collapsed' : ''
            )}
            onClick={() => {
              if (showItem === 2) setShowItem(null)
              else setShowItem(2)
            }}
          >
            {props.title.tow}
          </button>
        </h2>
        <div
          className="accordion-collapse overflow-hidden h-0 accordion_transition"
          style={{ height: `calc(${hItemTow()}px - 1rem)` }}
        >
          <div className="accordion-body" ref={towAccordion}>
            <p dir="auto">{props.di.tow}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accordion
