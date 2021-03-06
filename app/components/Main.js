var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var firebaseUtils = require('../utils/firebaseUtils');

var Main = React.createClass({

  getInitialState: function() {
    return {
      loggedIn: firebaseUtils.isLoggedIn()
    };
  },

  handleLogout: function(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    });
  },

  componentWillMount: function() {
    firebaseUtils.onChange = this.handleLogout;
  },

  render: function() {
    var loginOrOut;
    var register;

    if (this.state.loggedIn) {
      loginOrOut = <li><Link to="/logout" className="navbar-brand">Logout</Link></li>;
      register = null;
    } else {
      loginOrOut = <li><Link to="/login" className="navbar-brand">Login</Link></li>;
      register = <li><Link to="/register" className="navbar-brand"> Register </Link></li>;
    }

    return (
      <span>
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand"> PROJECT NAME </Link>
            </div>
            <ul className="nav navbar-nav pull-right">
              <li><Link to="/" className="navbar-brand"> Home </Link></li>
              <li><Link to="/dashboard" className="navbar-brand"> Dashboard </Link></li>
              {register}
              {loginOrOut}
            </ul>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            {this.props.children}
          </div>
        </div>
      </span>
    );
  }
});

module.exports = Main;
