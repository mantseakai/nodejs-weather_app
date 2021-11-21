console.log('Client side')

const weatherform = document.querySelector('#search_button')
const search = document.querySelector('input')
const msg_forecast = document.querySelector('#forecast')
const msg_error = document.querySelector('#error')
const msg_another = document.querySelector('#msg_other')
const currentbutton = document.querySelector('#current_button')

msg_forecast.innerHTML = ''



function getLocation() {
	if (navigator.geolocation) {
		
	  navigator.geolocation.getCurrentPosition(showPosition);
	} else { 
	  console.log("Geolocation is not supported by this browser.");
	}
  }
  
  function showPosition(position) {

	msg_forecast.innerHTML = 'Loading....'
	msg_error.innerHTML = ''
	fetch('/weather?auto_location=yes&latitude='+position.coords.latitude+'&longitude='+position.coords.longitude).then((response)=>{

		response.json().then((data) => {

			if(data.error)
			{
				console.log(data.error)
				msg_error.innerHTML = data.error
			}
			else
			{
				console.log(data.location)
				console.log(data.forecast)


				msg_forecast.innerHTML = data.location
				msg_error.innerHTML = data.forecast.description
				msg_another.innerHTML = data.forecast.temperature +' degrees but feels like '+ data.forecast.feelslike
			}
			
		})

	})

  }

  currentbutton.addEventListener('click',(e)=>{
	e.preventDefault()
	
  })

weatherform.addEventListener('click', (e)=>{
	e.preventDefault()

	const location = search.value

	msg_forecast.innerHTML = 'Loading....'
	msg_error.innerHTML = ''
	fetch('/weather?address='+location).then((response)=>{


		response.json().then((data) => {

			if(data.error)
			{
				console.log(data.error)
				msg_error.innerHTML = data.error
			}
			else
			{
				console.log(data.location)
				console.log(data.forecast)
				console.log(data.ip_address)
				console.log(data.geo)


				msg_forecast.innerHTML = data.location
				msg_error.innerHTML = data.forecast.description
				msg_another.innerHTML = data.forecast.temperature +' degrees but feels like '+ data.forecast.feelslike
			}
			
		})

	})
	

})