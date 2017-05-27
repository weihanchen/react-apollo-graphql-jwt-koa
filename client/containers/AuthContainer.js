import React, {
	Component,
} from 'react';
import PropTypes from 'prop-types';
import {
	connect
} from 'react-redux';
import { graphql, withApollo } from 'react-apollo';
import ApolloClient from 'apollo-client';
import {
	bindActionCreators
} from 'redux';
import {
	hashHistory
} from 'react-router-dom';
import LinearProgress from 'material-ui/LinearProgress';
import {
	requestAuthentication
} from '../actions';
import getCurrentUser from '../graphql/CurrentUserQuery.graphql';

class AuthContainer extends Component {

	componentDidMount() {
		const token = localStorage.getItem('token');
		const { history } = this.props;
		if (!token) history.push('/login')
		else {
			this.props.client.query({
				query: getCurrentUser
			})
			//this.props.requestAuthentication(token)
		}
	}

	componentWillReceiveProps(nextProps) {
		const status = nextProps.authentication.status
		const statusFunction = {
			'success': function() {
				hashHistory.push('/profile')
			},
			'error': function() {
				hashHistory.push('/login')
			}
		}
		if (statusFunction.hasOwnProperty(status)) statusFunction[status]()
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
		requestAuthentication
	}, dispatch)
}

AuthContainer.propTypes = {
	requestAuthentication: PropTypes.func,
	client: PropTypes.instanceOf(ApolloClient).isRequired
}

const AuthWithApollo = withApollo(AuthContainer);

// const AuthWithQuery = graphql(getCurrentUser, {
//    options: {
//       variables: {
//       }
//    },
//    name: 'getCurrentUser',
//    props: ({data}) => {
// 	   console.log(data);
//    }
  
// })(AuthContainer);//high order component

//todo ref: https://github.com/MacKentoch/react-redux-graphql-apollo-bootstrap-webpack-starter/blob/master/src/app/containers/home/Home.js
export default connect(mapStateToProps, mapDispatchToProps)(AuthWithApollo);