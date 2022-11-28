import Footer from './Footer'
import Header from './Header'
import Progress from './Progress'

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
          <Progress />
          {children}
        </div>
        <Footer NoFooter={NoFooter} />
      </>
    )
  else return children
}

export default Layout
