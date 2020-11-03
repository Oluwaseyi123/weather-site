const form = document.querySelector('form')
const search = document.querySelector('input')
const button = document.querySelector('.btn')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')

messageOne.textContent = 'Loading...'
messageTwo.textContent = ''


button.addEventListener('click', (e) => {
    const location = search.value
    console.log(location)
    fetch(`http://localhost:3000/weather?address=${location}`)
    .then((response) => {
    response.json()
    .then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.forecast.forecast
            messageTwo.textContent = data.location
            console.log(data.forecast.forecast)
            console.log(data.location)
        }
       
    })
})
    e.preventDefault()
})




