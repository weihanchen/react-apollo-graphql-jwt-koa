import React, {
   Component,
} from 'react';
import PropTypes from 'prop-types';
import {
   connect
} from 'react-redux';
import {
   bindActionCreators
} from 'redux';
import { graphql, withApollo } from 'react-apollo';
import ApolloClient from 'apollo-client';

import LinearProgress from 'material-ui/LinearProgress';
import {
   requestAuthentication,
   requestAuthenticationSuccess,
   requestFaild
} from '../actions';
import getCurrentUser from '../graphql/CurrentUserQuery.graphql';

class AuthContainer extends Component {

   async componentDidMount() {
      try {
         const token = localStorage.getItem('token');
         const { history } = this.props;
         if (!token) throw '';
         else {
            this.props.requestAuthentication();
            const currentUser = await this.props.client.query({
               query: getCurrentUser
            });
            this.props.requestAuthenticationSuccess(currentUser.data.Me);
         }
      } catch (error) {
          this.props.requestFaild(error);
      }
   }

   componentWillReceiveProps(nextProps) {
      const nextStatus = nextProps.authentication.status
      const { authentication, history } = this.props;
      const currentStatus = authentication.status;
      const statusFunction = {
         'success': function () {
            history.replace('/profile');
         },
         'error': function () {
            history.replace('/login');
         }
      }
      if (currentStatus != nextStatus && statusFunction.hasOwnProperty(nextStatus)) statusFunction[nextStatus]()
   }

   render() {
      return (
         <LinearProgress mode="indeterminate" />
      )
   }
}

const mapStateToProps = (state) => {
   return {
      authentication: state.authentication
   }
}

const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({
      requestAuthentication,
      requestFaild,
      requestAuthenticationSuccess
   }, dispatch)
}

AuthContainer.propTypes = {
   requestAuthentication: PropTypes.func,
   client: PropTypes.instanceOf(ApolloClient).isRequired
}

const AuthWithApollo = withApollo(AuthContainer);

//todo ref: https://github.com/MacKentoch/react-redux-graphql-apollo-bootstrap-webpack-starter/blob/master/src/app/containers/home/Home.js
export default connect(mapStateToProps, mapDispatchToProps)(AuthWithApollo);