import AboutCoin from '@components/pageCoin/AboutCoin'
import Chart from '@components/pageCoin/chart'
import Image from 'next/image'
import Star from '@components/stars/Star'
import toast from 'sweetalert2'
import { baseURL } from '@baseUrl'
import { Col, Dropdown } from 'react-bootstrap'
import { SortBySetaSeta, toPersian, usdInRials } from '@lib/helper'
import { useTranslation } from 'react-i18next'

type Props = {
  coin: any
  rials: number
  nameCoin: string
}
const ControllerPageCoin = (props: Props) => {
  const { nameCoin } = props
  const { t } = useTranslation()
  const copyHandler = () => {
    navigator.clipboard.writeText(`${baseURL}coins/${nameCoin}`)
    toast.fire({
      icon: 'success',
      toast: true,
      position: 'top-end',
      timer: 3000,
      title: t('copy.ok'),
      showConfirmButton: false,
      showCloseButton: true,
      timerProgressBar: true,
    })
  }
  return (
    <>
      <div className="row w-100 ms-0">
        <Col className="d-flex mb-3 justify-content-between">
          <div className="d-flex">
            <div className="ms-2 d-flex">
              <div className="d-flex align-items-center coinPage_imgCoin">
                <Image
                  src={`/static/images/coins/${props.coin.poster_path}`}
                  alt={props.coin.name}
                  width={40}
                  height={40}
                />
              </div>
              <div className="d-flex pt-3">
                <div style={{ lineHeight: 0 }}>
                  <h1 className="ms-1 h5" title={t('name-coin')}>
                    {t('lang') ? props.coin.name : props.coin.all_name}
                  </h1>
                  <br />
                  <h2 className="d-flex mb-0 coinPage_nameEN">
                    <span className="text-uppercase font-15">
                      {'(' + nameCoin + ')'}
                    </span>
                    <i className="text-white">_</i>
                    <span className="text-capitalize font-15">
                      {t('lang') ? props.coin.all_name : props.coin.name}
                    </span>
                  </h2>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center ms-2 font-17">
              <Star
                name={nameCoin}
                faName={props.coin.name}
                id={props.coin.id}
                poster_path={props.coin.poster_path}
              />
            </div>
          </div>
          <div className="d-flex align-items-center ms-1">
            <span
              style={{
                borderRadius: 10,
                color: '#014a8f',
                background: '#f2f6f9',
                padding: '6px 8.5px',
              }}
            >
              {'#' + toPersian(props.coin.id, t('lang'))}
            </span>
            <Dropdown className="coinPage_icon ms-1">
              <Dropdown.Toggle variant="width" className="border-0">
                <div className="d-flex text-secondary">
                  <i className="bi bi-link-45deg bg-white font-18 px-1 d-flex align-items-center"></i>
                  <span className="font-13 d-none d-sm-flex">اشتراک گزاری</span>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  target="_blank"
                  href={`mailto:?subject=${
                    'صفحه کوین ' + props.coin.name
                  }&body=Open this link:%0D%0A${baseURL}coins/${nameCoin}`}
                  rel="nofollow"
                >
                  <i className="bi bi-envelope"></i>
                  <span className="ms-1">{t('email')}</span>
                </Dropdown.Item>
                <Dropdown.Item
                  target="_blank"
                  rel="nofollow"
                  href={`https://t.me/share/url?url=${baseURL}coins/${nameCoin}`}
                >
                  <i className="bi bi-telegram"></i>
                  <span className="ms-1">{t('telegram')}</span>
                </Dropdown.Item>
                <Dropdown.Item
                  target="_blank"
                  rel="nofollow"
                  href={`whatsapp://send?text=${baseURL}coins/${nameCoin}`}
                >
                  <i className="bi bi-whatsapp"></i>
                  <span className="ms-1">{t('whatsapp')}</span>
                </Dropdown.Item>
                <Dropdown.Item onClick={copyHandler}>
                  <i className="bi bi-journals"></i>
                  <span className="ms-1">{t('copy.link')}</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>
        <AboutCoin
          dayGrith={props.coin.dayGrith}
          aboutCoin={props.coin.aboutCoin}
        />
        <Col>
          <div
            title={t('change-24h')}
            className={`bg-${props.coin.day.colorDayIn} coinPage_dar text-white justify-content-around mt-3 pb-3 pt-3 d-flex text-center`}
          >
            <span>
              <i
                className={`bi me-1 bi-caret-${
                  props.coin.day.colorDayIn === 'danger' ? 'down' : 'up'
                }-fill`}
              ></i>
              {toPersian(props.coin.day.dayIn, t('lang')) +
                '٪' +
                (props.coin.day.colorDayIn === 'danger' ? '-' : '+')}
            </span>
          </div>
        </Col>
        <div></div>
        <Col
          className="mt-3 mb-3"
          style={{ paddingLeft: 'calc(var(--bs-gutter-x) * .0)' }}
        >
          <div className="d-flex flex-column" title={t('mane-usd')}>
            <span className="text-good">{t('mane-usd')}:</span>
            <span className="font-18 mt-1">
              {'$' + toPersian(SortBySetaSeta(props.coin.usd), t('lang'))}
            </span>
          </div>
        </Col>
        <Col className="d-flex mt-3 align-items-center mb-3">
          <div className="d-flex flex-column" title={t('mane-rials')}>
            <span className="text-good">{t('mane-rials')}:</span>
            <span className="font-18 mt-1">
              {toPersian(
                SortBySetaSeta(usdInRials(props.coin.usd, props.rials)),
                t('lang')
              )}
              <span
                style={{
                  fontSize: '0.625rem',
                  fontWeight: 400,
                  color: 'rgb(151, 160, 175)',
                }}
              >
                {' ' + t('toman')}
              </span>
            </span>
          </div>
        </Col>
      </div>
      <Chart props={props.coin} nameCoin={nameCoin} />
    </>
  )
}

export default ControllerPageCoin
