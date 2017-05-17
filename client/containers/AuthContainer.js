import React, {
	Component,
} from 'react';
import PropTypes from 'prop-types';
import {
	connect
} from 'react-redux';
import { graphql } from 'react-apollo';
import {
	bindActionCreators
} from 'redux';
import {
	hashHistory
} from 'react-router';
import LinearProgress from 'material-ui/LinearProgress';
import {
	requestAuthentication
} from '../actions';
import USER_QUERY from '../graphql/UserQuery.graphql';

class AuthContainer extends Component {

	componentDidMount() {
		const token = localStorage.getItem('token')
		if (!token) hashHistory.push('/login')
		else this.props.requestAuthentication(token)
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
	requestAuthentication: PropTypes.func
}

const AuthWithQuery = graphql(USER_QUERY, {
   options: {
      variables: {
         id: 'userid'
      }
   },
   name: 'getUser',
   props: ({
     ownProps

   })
})(AuthContainer);//high order component

//todo ref: https://github.com/MacKentoch/react-redux-graphql-apollo-bootstrap-webpack-starter/blob/master/src/app/containers/home/Home.js
export default connect(mapStateToProps, mapDispatchToProps)(AuthWithQuery);