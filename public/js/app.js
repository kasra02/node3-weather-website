console.log('client side is loaded')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const firstly = document.querySelector('.firstly')
const secondly = document.querySelector('.secondly')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    firstly.textContent = 'loading'
    secondly.textContent= ''
    const location = search.value
    fetch(`/weather?address=${location}`)
        .then(res=>res.json())
        .then(data=>{
            switch (data.statuscode){
                case 4404:
                    firstly.textContent = 'esm city doro'
                case 2202:
                    firstly.textContent  = data.fordata
                    secondly.textContent = data.name
                    search.value = ''
            }
        })
})
