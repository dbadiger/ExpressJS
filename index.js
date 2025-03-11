import express from 'express'
import { searchController } from './controller.js'
import router from './route.js'

const app = express()
const PORT = 3000

//Designing simple route
// app.get('/', (req, res)=>{
//     res.send("Express Application")
// })
/*
//About Route
app.get("/about", (req, res)=>{
    res.send("About Route")
})

//Contact Route
app.get("/contact", (req, res)=>{
    res.send("Contact Route")
})
*/
// app.get("/user/:username", userController)

// `/search?keyword=express`
app.get("/search", searchController)

// app.get("/user/login", userLogin);
// app.get("/user/signup", userSignup);

app.use('/user', router)
app.use(express.json())

/* Route level Middleware
app.use('/welcome',(req, res, next)=>{
    console.log("New request has received at "+ Date.now())
    next();
})

app.get('/welcome', (req, res)=>{
    res.send("Welcome to Middleware")
})*/

/* //Middleware execution order
app.use((req, res, next)=>{
    console.log("Start")

    res.on('finish',()=>{
        console.log('End');
        
    })
    next()
})
app.get("/", (req, res)=>{
    console.log('Middle');
    res.send("Welcome express")
    
})
*/


app.get('/error', ()=>{
    throw new Error('This is test error')
})
app.use((err, req, res, next)=>{
    console.error(err.message);
    res.send('Internal Server Error')
})


app.post("/users",(req, res)=>{
    const {name, email} = req.body;
    res.json({
        message:`User ${name} is registerd with ${email} successfully.`
    })
})

app.put('/users/:id', (req, res)=>{
    const userId = req.params.id
    const {name,email} = req.body;
    res.json({
        message:`User ${userId} updated to ${name} , ${email}`
    })

})

app.delete('/users/:id', (req, res)=>{
    const userId = req.params.id
    res.json({
        message:`user with ID ${userId} deleted successfully.`
    })
})

// handling with multiple parameters
app.get('/things/:name/:id([0-9]{5})', (req, res)=>{
    const {name, id} = req.params;
    res.json({
        id, name
    })
    
})

//Catch all invalid routes
app.get('*', (req, res)=>{
    res.send('Sorry, this is an invalid URL')
})

app.listen(PORT, ()=>{
    console.log(`Server is Started at http://localhost:${PORT}`)
})