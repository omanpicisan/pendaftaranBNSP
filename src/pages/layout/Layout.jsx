
const Layout = ({children}) => {
  return (

    <div className="flex vh-100">
       <div className="flex-glow-1 p2">
         {children}
       </div>
    </div>
  )
}

export default Layout
