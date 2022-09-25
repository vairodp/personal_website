const $ = _ => document.querySelector(_)

const $c = _ => document.createElement(_)

String.prototype.pad = function(size){
	let s = String(this)
	while (s.length < (size || 2)) {s = "0" + s}
	return s
}

// Setting the clock
const time = () => {
	const date = new Date();
	$('#clock').innerHTML = `${date.getHours().toString().pad(2)}:${date.getMinutes().toString().pad(2)}`
	setTimeout( time, 5000 )
}

// Function to set the date of the last update 
function setModifiedDate() {
	if (document.getElementById('last-modified')) {
		fetch("https://api.github.com/repos/vairodp/placeholder/branches/master")
			.then((response) => {
				return response.json();
			})
			.then((commits) => {
				var modified = commits.commit.commit.author.date.slice(0, 10);
				if (modified != "{{ page.date | date: '%Y-%m-%d' }}")
				{
					string = "Site last updated on " + modified;
					document.getElementById('last-modified').innerHTML = string.italics();  
				}
			});
}
}

// Function to manage the loading screen
function removeFadeOut(el, speed) {
	var seconds = speed / 1000;
	el.style.transition = "opacity " + seconds + "s ease";

	el.style.opacity = 0;
	setTimeout(function () {
		el.parentNode.removeChild(el);
	}, speed);
}

window.onload = (event) => {
	document.getElementById('Timeline').style.display = 'none';
	console.log('page is fully loaded');
	removeFadeOut(document.getElementById("loading"), 1000);
	//removeFadeOut(document.getElementById("Timeline"), 1000);
	
};

setModifiedDate()
time()