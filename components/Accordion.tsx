import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'

const Accordion = (props) => {
  const [showItem, setShowItem] = useState<null | number>(null)
  const oneAccordion = useRef(null)
  const towAccordion = useRef(null)
  const div1 = useRef(null)
  const div2 = useRef(null)
  useEffect(() => {
    const oneAccordionY = oneAccordion.current.getBoundingClientRect().height
    const towAccordionY = towAccordion.current.getBoundingClientRect().height
    if (showItem === 1) {
      div1.current.style.height = `calc(${oneAccordionY}px - 1rem)`
      div2.current.style.height = 0
    } else if (showItem === 2) {
      div2.current.style.height = `calc(${towAccordionY}px - 1rem)`
      div1.current.style.height = 0
    } else {
      div1.current.style.height = 0
      div2.current.style.height = 0
    }
  }, [showItem])
  return (
    <div className="accordion accordion-flush">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className={classNames(
              'accordion-button',
              !(showItem === 1) && 'collapsed'
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
        <div className="accordion-collapse accordion_transition" ref={div1}>
          <div className="accordion-body" ref={oneAccordion}>
            <p className="accordion_list" dir="auto">
              {props.di.one}
            </p>
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            type="button"
            className={classNames(
              'accordion-button',
              !(showItem === 2) && 'collapsed'
            )}
            onClick={() => {
              if (showItem === 2) setShowItem(null)
              else setShowItem(2)
            }}
          >
            {props.title.tow}
          </button>
        </h2>
        <div className="accordion-collapse accordion_transition" ref={div2}>
          <div className="accordion-body" ref={towAccordion}>
            <p className="accordion_list" dir="auto">
              {props.di.tow}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accordion
