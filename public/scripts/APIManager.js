// // export default {
//
// 	get: (url) => {
//
// 		return new Promise((resolve, reject) => {
//
// 			var xhr = new XMLHttpRequest();
// 			xhr.onreadystatechange = function() {
//
// 				if(xhr.readyState === 4) {
//
// 					if(xhr.status === 200)
// 						resolve(JSON.parse(xhr.responseText));
// 					else
// 						reject("Response status " + xhr.status);
// 				}
// 			}
//
// 			xhr.onerror = function(error) {
//
// 				if(xhr.status == 0)
// 					reject(error);
// 				else
// 					reject(error);
// 			}
//
// 			xhr.open("GET", url, true);
// 			xhr.send();
// 		});
// 	},
// // }

const get = (url) => {

	return new Promise((resolve, reject) => {

		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {

			if(xhr.readyState === 4) {

				if(xhr.status === 200)
					resolve(JSON.parse(xhr.responseText));
				else
					reject("Response status " + xhr.status);
			}
		}

		xhr.onerror = function(error) {

			if(xhr.status == 0)
				reject(error);
			else
				reject(error);
		}

		xhr.open("GET", url, true);
		xhr.send();
	});
};


const post = (url, requestHeader, params) => {

	return new Promise((resolve, reject) => {

		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);

		if(requestHeader)
			xhr.setRequestHeader("Content-type", requestHeader);
		else
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		xhr.onreadystatechange = function() {

			if(xhr.readyState === 4) {

				if(xhr.status !== 200)
					reject(new Error("Some error occured! " + xhr.responseText));

				resolve(xhr.responseText);
			}
		}
		xhr.send(params);
	});
};
