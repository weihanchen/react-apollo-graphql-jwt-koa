import React from 'react'
import AppBar from 'material-ui/AppBar';
class Footer extends React.Component {
   render() {
      return (
         <nav className="navbar navbar-default navbar-fixed-bottom footer">
            <div className="container-fluid text-center footer-text">
               <a href="https://github.com/weihanchen/react-apollo-graphql-jwt-koa" target="_blank">React-apollo-graphql-jwt-koa</a>  is maintained by  <a href="https://github.com/weihanchen" target="_blank">weihanchen</a>
            </div>
         </nav>
      )
   }
}

export default Footer