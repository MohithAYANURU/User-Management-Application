const fetchData = async () => {
	const response = await fetch(
		"https://easy-simple-users-rest-api.onrender.com"
	)
	const data = await response.text()
	console.log(data)
}

fetchData()