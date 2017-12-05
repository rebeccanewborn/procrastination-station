import React, { Component } from "react";
import "./App.css";
import { Route, withRouter } from "react-router-dom";
import api from "./services/api";
import DistractifyContainer from "./components/DistractifyContainer";

class App extends Component {
	constructor() {
		super();

		this.state = {
			auth: {
				user: {}
			},
			isLoaded: false
		};
	}

	componentDidMount() {
		let reroutes = [
			"/my_profile",
			"/my_profile/edit",
			"/feed",
			"/network",
			"/login"
		];
		let token = localStorage.getItem("token");
		if (token) {
			api.getCurrentUser(token).then(res => this.login(res));
		} else {
			if (reroutes.includes(this.props.history.location.pathname)) {
				this.props.history.push("/login");
				this.setState({ isLoaded: true });
			}
		}
	}

	componentWillUpdate() {
		console.log("APP COMPONENT WILL UPDATE");
	}

	login(res) {
		localStorage.setItem("token", res.token);
		this.setState(
			{
				auth: {
					user: res
				},
				isLoaded: true
			},
			() => {
				if (
					this.props.history.location.pathname === "/login" ||
					this.props.history.location.pathname === "/signup"
				) {
					this.props.history.push("/feed");
				}
			}
		);
	}

	updateUser(userData) {
		this.setState({
			auth: {
				user: userData
			}
		});
		this.props.history.push("/my_profile");
	}

	logout() {
		localStorage.removeItem("token");
		this.setState(
			{
				auth: {
					user: {}
				}
			},
			() => this.props.history.push("/login")
		);
	}

	render() {
		return (
			<Route
				path="/"
				render={() => {
					return this.state.isLoaded ? (
						<DistractifyContainer
							loginMethod={this.login.bind(this)}
							logoutMethod={this.logout.bind(this)}
							user={this.state.auth.user}
							updateUserMethod={this.updateUser.bind(this)}
						/>
					) : (
						<h1>Loading...</h1>
					);
				}}
			/>
		);
	}
}

export default withRouter(App);
