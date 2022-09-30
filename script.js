var button = document.getElementById("submit");
var authorInput = document.getElementById("author");
var textInput = document.getElementById("text");
var chat = document.querySelector("ul");
var userInput = document.getElementById("userInput");

function inputsLength(){
	return author.value.length > 0 && text.value.length > 0 ? true : false;
}

function addMessageToChat(){
	var li = document.createElement("li");
	li.appendChild(document.createTextNode(authorInput.value + ": " + textInput.value));
	chat.appendChild(li);
}

function addMessageToChatTest(autor, text){
	var li = document.createElement("li");
	li.appendChild(document.createTextNode(autor + ": " + text));
	chat.appendChild(li);
}

button.addEventListener("click", function(){
	if(inputsLength){
		addMessageToChat();
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

function POST(){
	var message = {
		author: authorInput.value,
		text: textInput.value
	};

	let config = {
		method: 'POST',
		headers: {
		    'Content-Type': 'application/json',
		},
		body: JSON.stringify(message)
	};

	fetch("http://localhost:8080/api/v1/messages", config)
	.then(function (response) {
		return response.json();
	}).then(function (obj) {
		console.log(obj);
	}).catch(function (error){
		console.log('Smth wrong');
		console.log(error);
	})
}

document.addEventListener("DOMContentLoaded", async function() {
	let config = {
		method: 'GET',
		headers: {
		    'Content-Type': 'application/json',
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
			addMessageToChatTest(InputAuthor, InputText);
		}
	}).catch(function (error){
		console.log('Smth wrong');
		console.log(error);
	})
}, false);