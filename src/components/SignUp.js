import React from "react";
import { Container, Form, Header, Button, Card } from "semantic-ui-react";
import FormInfo from "../services/formInfo";

class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			passwordConfirmation: "",
			preferredSources: [],
			preferredCategories: []
		};
		this.handleSignUpTerms = this.handleSignUpTerms.bind(this);
		this.handleSignUpCheckboxes = this.handleSignUpCheckboxes.bind(this);
	}
	handleSignUpTerms(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleSignUpCheckboxes(event) {
		let collection = this.state[event.target.name];

		if (event.target.checked) {
			collection.push(parseInt(event.target.value));
		} else {
			collection = collection.filter(
				item => item !== parseInt(event.target.value)
			);
		}

		this.setState({
			[event.target.name]: collection
		});
	}

	render() {
		let sourceOptions = FormInfo.sources.map(source => (
			<Card align="center" style={{ width: "100px", height: "50px" }}>
				<input
					type="checkbox"
					name="preferredSources"
					value={source.id}
					onChange={this.handleSignUpCheckboxes}
				/>
				<Card.Header>{source.name}</Card.Header>
			</Card>
		));

		return (
			<Container align="center">
				<Header as="h1">SignUp</Header>
				<Form
					onSubmit={ev => {
						ev.preventDefault();
						this.props.handleSignupSubmit(this.state);
					}}
				>
					<Container style={{ width: "500px" }}>
						<Form.Field className="field">
							<input
								onChange={this.handleSignUpTerms}
								value={this.state.username}
								type="text"
								name="username"
								placeholder="Username"
							/>
						</Form.Field>
						<Form.Field>
							<input
								onChange={this.handleSignUpTerms}
								value={this.state.password}
								type="text"
								name="password"
								placeholder="Password"
							/>
						</Form.Field>

						<Form.Field>
							<input
								onChange={this.handleSignUpTerms}
								value={this.state.passwordConfirmation}
								type="text"
								name="passwordConfirmation"
								placeholder="Password Confirmation"
							/>
						</Form.Field>
					</Container>
					<br />
					<Container style={{ width: "750px" }}>
						<Header as="h3">Choose Sources: </Header>
						<Card.Group style={{ paddingLeft: "42px" }}>
							{sourceOptions}
						</Card.Group>
					</Container>
					<br />
					<Form.Field>
						<Button type="submit">Submit</Button>
					</Form.Field>
				</Form>
			</Container>
		);
	}
}

export default SignUp;
