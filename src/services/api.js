import keys from "./keys.js";
const newsURL = "https://newsapi.org/v2";
const backendURL = "http://localhost:3000/api/v1";
const API_KEY = keys.api;
const newsHeaders = { "X-Api-Key": API_KEY };
const backendHeaders = {
	Accept: "application/json",
	"Content-Type": "application/json"
};

const api = {
	getFeed: () => {
		return fetch(`${newsURL}/top-headlines?sources=bbc-news,the-verge`, {
			newsHeaders
		}).then(res => res.json());
	},

	search: term => {
		return fetch(`${newsURL}/everything?q=${term}`, {
			newsHeaders
		});
	},

	getAllSourcesAndCategories: () => {
		return fetch(`${backendURL}/signup`).then(res => res.json());
	},

	postNewUser: (data, login) => {
		console.log("inside postNewUser", data);

		fetch(`${backendURL}/users`, {
			method: "POST",
			body: JSON.stringify({ user: data }),
			headers: backendHeaders
		})
			.then(res => res.json())
			.then(res => login(res));
	}
};

export default api;
