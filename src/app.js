

const express = require("express")
const app = express()

const port = process.env.PORT || 3000

const path = require("path")
const x = path.join(__dirname, "../public")
app.use(express.static(x))

//////////////////////////////////////////////////////////////////////

app.set('view engine', 'hbs');



const viewsDirectory = path.join( __dirname ,'../temp1/views') 
app.set('views', viewsDirectory);

//////////////////////////////////////////////////////////////////////

var hbs = require("hbs")

const partialsPath = path.join(__dirname , "../temp1/partials");

hbs.registerPartials(partialsPath)
////////////////////////////////////////////////////////////////////////////


app.get('/' , (req , res) =>{
    res.render('index' , {
        title : 'HOME' , 
        desc : 'this is home page'
    })
})


app.get('/services' , (req , res) =>{
    res.render('services' , {
        title : 'SERVICES' , 
        name : 'mora' ,
        age : 22 ,
        city :'tanta',
        img1 : 'images/trainer-3.jpeg'
    })
})

app.get('/team' , (req , res) =>{
    res.render('team' , {
        title : 'team' , 
        name : 'ahmed' ,
        age : 25 ,
        city :'tanta',
        img2 : 'images/trainer-3.jpeg'
    })
})






app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})



