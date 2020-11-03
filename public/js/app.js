const form = document.querySelector('form')
const search = document.querySelector('input')
const button = document.querySelector('.btn')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')
const picDiv = document.querySelector('.pic')




button.addEventListener('click', (e) => {
    const location = search.value
    messageOne.textContent = 'loading ... '
    messageTwo.textContent = ''
    picDiv.src = ''
    console.log(location)
    fetch(`/weather?address=${location}`)
    .then((response) => {
   
    response.json()
    .then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        }else{
                picDiv.src = data.forecast.img
                messageOne.textContent = data.forecast.forecast
                messageTwo.textContent = data.location     
        }
    })
})
    e.preventDefault()
})




