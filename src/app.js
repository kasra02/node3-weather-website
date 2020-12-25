const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')
const app = express()
const port = process.env.PORT || 3000
// define pathfor express
const viewPath = path.join(__dirname,'../templates/views')
const publicDirectoyr = path.join(__dirname,'../public')

const partialPath = path.join(__dirname,'../templates/partials')

//setup handler bar engine and views locations
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//setup static directory
app.use(express.static(publicDirectoyr))

app.get('', (req,res)=>{
    res.render('index',{
        title:"index",
        name:'andrew'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title:"aboutMe",
        aboutMe:'my name is the greatest programmer in the world',
        name:'andrew'
    })
})


app.get('/help', (req, res) => {
    res.render('help',{
        title:"help",
        location:"rasht",
        name:'andrew'
    })
})

app.get('/weather',((req, res) => {
    if(!req.query.address){
        res.send({
            error:'nothing to show'
        })
    }

    geocode(req.query.address,(erro, {latitude, longtitude, name}={})=>{
        if(erro){
            return res.send({
                statuscode:4404,
                error:`something went wrong ${erro}`
            })}

        forcast(latitude,longtitude,(err, fordata) => {
            if(err){
                return res.send({
                    err:'something with forcasst went wrong'
            })}
            else if(latitude, longtitude, name, fordata){
                console.log(latitude, longtitude, name, fordata)
                res.send({
                    statuscode:2202,
                    name:name,
                    fordata:fordata
                })
            }
            else{
                app.send({error:'city name is not know'})
            }
        })
    })
}))



app.get('/products',((req, res) => {
    if(!req.query.search){
        return res.send({
            error:'nothing to show'
        })
    }
    res.send({
        products:[]
    })
}))


app.get('/help/*',((req, res) => {
    res.render('404',{
        name:'andrew',
        title:"/help/*",
    })
}))


app.get('*',(req,res)=>{
    res.render('404',{
        name:'andrew',
        title:"help",
    })
})

app.listen(port,()=>{
    console.log('server is up on port')})