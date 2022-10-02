var button = document.getElementById("submit");
var authorInput = document.getElementById("author");
var textInput = document.getElementById("text");
var chat = document.querySelector("ul");
var userInput = document.getElementById("userInput");

function inputsLength() {
	return authorInput.value.length > 0 && textInput.value.length > 0 ? true : false;
}

function addMessageToChat(author, text) {
	var li = document.createElement("li");
	li.appendChild(document.createTextNode(author + ": " + text));
	chat.appendChild(li);
}



button.addEventListener("click", function () {
	if (inputsLength()) {
		addMessageToChat(authorInput.value, textInput.value);
		POST();
	}
	// else {
	// 	var errMess = document.createElement("h5");
	// 	errMess.appendChild(document.createTextNode("Name or message cannot be empty("));
	// 	errMess.style.setProperty('color', 'red');
	// 	errMess.style.setProperty('text-align', 'center');
	// 	userInput.insertBefore(errMess, userInput.firstChild);
	// }
})

function POST() {
	var message = {
		author: authorInput.value,
		text: textInput.value
	};

	let config = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(message)
	};

	fetch("http://localhost:8080/api/v1/messages", config)
		.then(function (response) {
			return response.json();
		}).then(function (obj) {
			console.log(obj);
		}).catch(function (error) {
			console.log('Smth wrong');
			console.log(error);
		})
}

function GET() {
	let config = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	};

	fetch("http://localhost:8080/api/v1/messages", config)
		.then(function (response) {
			return response.json();
		}).then(function (obj) {
			id = obj;
			for (var i = 0; i < obj.length; i++) {
				let InputAuthor = obj[i].author;
				let InputText = obj[i].text;
				addMessageToChat(InputAuthor, InputText);
			}
		}).catch(function (error) {
			console.log('Smth wrong');
			console.log(error);
		})
}

document.addEventListener("DOMContentLoaded", async function () {
	GET();
}, false);