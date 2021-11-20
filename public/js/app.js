console.log('Client side')

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const msg_forecast = document.querySelector('#forecast')
const msg_error = document.querySelector('#error')


msg_forecast.innerHTML = ''
weatherform.addEventListener('submit', (e)=>{
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


				msg_forecast.innerHTML = data.location
				msg_error.innerHTML = data.forecast.description
			}
			
		})

	})
	

})