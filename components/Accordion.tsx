import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'

const Accordion = (props) => {
  const [showItem, setShowItem] = useState<null | number>(null)
  const [heightItemOen, setHeightItemOen] = useState<number | string>(0)
  const [heightItemTow, setHeightItemTow] = useState<number | string>(0)
  const oneAccordion = useRef(null)
  const towAccordion = useRef(null)
  useEffect(() => {
    const oneAccordionY = oneAccordion.current.getBoundingClientRect().height
    const towAccordionY = towAccordion.current.getBoundingClientRect().height
    if (showItem === 1) {
      setHeightItemOen(`calc(${oneAccordionY}px - 1rem)`)
      setHeightItemTow(0)
    } else if (showItem === 2) {
      setHeightItemOen(0)
      setHeightItemTow(`calc(${towAccordionY}px - 1rem)`)
    } else {
      setHeightItemOen(0)
      setHeightItemTow(0)
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
        <div
          className="accordion-collapse accordion_transition"
          style={{ height: heightItemOen }}
        >
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
        <div
          className="accordion-collapse accordion_transition"
          style={{ height: heightItemTow }}
        >
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
