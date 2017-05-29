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
import LinearProgress from 'material-ui/LinearProgress';
import {
	requestAuthentication,
	requestAuthenticationFaild,
	requestAuthenticationSuccess
} from '../actions';
import getCurrentUser from '../graphql/CurrentUserQuery.graphql';

class AuthContainer extends Component {

	componentDidMount() {
		const token = localStorage.getItem('token');
		const { history } = this.props;
		if (!token) history.push('/login')
		else {
			this.props.requestAuthentication();
			this.props.client.query({
				query: getCurrentUser
			})
			.then(result => this.props.requestAuthenticationSuccess(result.data.Me))
			.catch(error => {
                console.log(error);
                this.props.requestAuthenticationFaild(error)
            });
		}
	}

	componentWillReceiveProps(nextProps) {
		const nextStatus = nextProps.authentication.status
		const { authentication, history } = this.props;
		const currentStatus = authentication.status;
		const statusFunction = {
			'success': function() {
				history.push('/profile')
			},
			'error': function() {
				history.push('/login')
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
		requestAuthenticationFaild,
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