const form = document.querySelector('form')
const search = document.querySelector('input')
const button = document.querySelector('.btn')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')


messageTwo.textContent = ''

button.addEventListener('click', (e) => {
    const location = search.value
    console.log(location)
    fetch(`/weather?address=${location}`)
    .then((response) => {
   
    response.json()
    .then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        }else{
            setTimeout(() => {
                messageOne.textContent = 'loading ... '
            }, 500)
            
           
            setTimeout(() => {
                messageOne.textContent = data.forecast.forecast
                messageTwo.textContent = data.location     
            }, 1000)
            
        }
    })
})
    e.preventDefault()
})




