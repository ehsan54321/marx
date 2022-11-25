import Footer from './Footer'
import Header from './Header'

type Props = {
  children: JSX.Element
  NoLayout: boolean
  NoFooter: boolean
}
const Layout = ({ children, NoLayout, NoFooter }: Props) => {
  if (!NoLayout)
    return (
      <>
        <div>
          <Header />
          <div className="mt-3 pt-5"></div>
          {children}
        </div>
        <Footer NoFooter={NoFooter} />
      </>
    )
  else return children
}

export default Layout
