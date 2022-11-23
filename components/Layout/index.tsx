import Footer from './Footer'
import Header from './Header'

type LayoutProps = {
  children: JSX.Element
  NoLayout: boolean
  NoFooter: boolean
}
const Layout: React.FC<LayoutProps> = ({ children, NoLayout, NoFooter }) => {
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
