import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import {
  Link
} from 'react-router-dom';
import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux';
import { graphql, withApollo } from 'react-apollo';
import ApolloClient from 'apollo-client';
import CircularProgress from 'material-ui/CircularProgress';
import {
  requestCurrentUser,
  requestCurrentUserSuccess,
  requestFaild,
  requestLogoutSuccess,
  requestUpdateUser,
  resetLogoutStatus,
  resetUserStatus
} from '../actions';
import ErrorContent from '../components/ErrorContent';
import Profile from '../components/Profile';
import getCurrentUser from '../graphql/CurrentUserQuery.graphql';
import logoutMutation from '../graphql/Logout.graphql';


class ProfileContainer extends Component {

  constructor(props) {
    super(props);
    this.props.resetLogoutStatus();
    this.props.resetUserStatus();
  }

  async componentDidMount() {
    try {
      const token = localStorage.getItem('token');
      if (!token) this.props.history.push('/login');
      else {
        this.props.requestCurrentUser();
        const currentUser = await this.props.client.query({
          query: getCurrentUser
        });
        this.props.requestCurrentUserSuccess(currentUser.data.Me);
      }
    } catch (error) {
      this.props.requestFaild(error);
    }
  }

  componentWillReceiveProps(nextProps) {
    const logout_status = nextProps.logout.status;
    if (logout_status === 'success') this.props.history.push('/login');
  }

  async handleLogout() {
    try {
      await this.props.client.mutate({
        mutation: logoutMutation
      });
      localStorage.removeItem('token');
      this.props.requestLogoutSuccess();
    } catch (error) {
      this.props.requestFaild(error);
    }
  }


  handleUpdateUser(displayName, uid, username) {
    const token = localStorage.getItem('token')
    const {
			user
		} = this.props
    user.displayName = displayName
    user.uid = uid
    user.username = username
    this.props.requestUpdateUser(token, user)
  }

  render() {
    const {
			user
		} = this.props
    const self = this;
    const renderStatus = {
      loading: function () {
        return (<div className="text-center">
          <CircularProgress size={160} thickness={7} />
        </div>)
      },
      error: function () {
        return (
          <div className="text-center">
            <ErrorContent message={user.error.message} />
            <Link to='/login'>Redirect to login</Link>
          </div>)
      },
      success: function () {
        return (
          <Profile displayName={user.displayName} role={user.role} uid={user.uid} username={user.username} handleUpdateUser={self.handleUpdateUser.bind(self)} handleLogout={self.handleLogout.bind(self)} />
        )
      }
    }
    if (renderStatus.hasOwnProperty(user.status)) return renderStatus[user.status]()
    return (<div></div>)
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    logout: state.logout
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    requestCurrentUser,
    requestCurrentUserSuccess,
    requestFaild,
    requestLogoutSuccess,
    requestUpdateUser,
    resetLogoutStatus,
    resetUserStatus
  }, dispatch)
}

ProfileContainer.propTypes = {
  client: PropTypes.instanceOf(ApolloClient).isRequired,
  requestCurrentUser: PropTypes.func,
  requestCurrentUserSuccess: PropTypes.func,
  requestFaild: PropTypes.func,
  requestLogoutSuccess: PropTypes.func,
  user: PropTypes.object
}

const ProfileWithApollo = withApollo(ProfileContainer);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileWithApollo)