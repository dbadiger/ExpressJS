# ExpressJS

Express JS is a minimal, fast, and flexible web application framework for NodeJS. It simplifies the process of building web applications and APIs by providing robust tools and features.

ExpressJS allows developers to handle routing, middleware, request handling and server-side logic efficiently.

ExpressJS is built on NodeJS and uses JavaScript for backend development. It follows the middleware pattern, making it easy to extend functionalities.

It has full stack compatibility. It work with frontend frameworks like React, Angular, Vue and many more.

### FAST		EFFICIENT		SCALABLE

Pre-requisites:
Install NodeJS
node -v
npm -v

### Create index.js file:
In terminal: npm init → which will initiate package.json file
Changes need to be done in package.json file:

    “type” : ”modules”
    Scripts:{
    	“start”: “node index.js” 		
    //after installing nodemon, the script execution will become:
    	“start”: “nodemon index.js”
    }

In terminal: npm start      	→ starts the server. (before change script: node index.js)

index.js

    import express from 'express'
    
    const app = express()
    const PORT = 3000
    
    //Designing simple route
    app.get('/', (req, res)=>{
        res.send("Express Application")
    })
    app.listen(PORT, ()=>{
        console.log(`Server is Started at http://localhost:${PORT}`)
    })

## Routing in ExpressJS
 > app.METHOD (PATH, HANDLER);

A route in ExpressJS consists of:
- METHOD --> HTTP Method (GET, POST, PUT, PATCH, DELETE)
- PATH --> URL route (eg, '/' , '/users' , '/login' , '/signup' , '/about') 
- HANDLER --> Function that runs when the route is accessed.


      import express from 'express'
        
      const app = express()
      const PORT = 3000
      //Designing simple route
      app.get('/', (req, res)=>{
      res.send("Express Application")
      })
            
      //About Route
      app.get("/about", (req, res)=>{
       res.send("About Route")
      })
            
       //Contact Route
      app.get("/contact", (req, res)=>{
          res.send("Contact Route")
      })
            
       app.listen(PORT, ()=>{
          console.log(`Server is Started at http://localhost:${PORT}`)
       })

## Dynamic Routing

Express allows dynamic routing using route parameters and query strings.

Dynamic Route - http://localhost:3000/user/darshan
- Used to capture dynamic values from the URL.
- Defined using `:parameter_name`.

### Query Strings
Query Strings - http://localhost:3000/search?keyword=ExpressJS

- Used to pass optional data in the URL after `?`.
- Extracted using `req.body`.

      import express from 'express'
      
      const app = express()
      const PORT = 3000
    
      // Dynamic Routing
      app.get("/user/:username", (req, res)=>{
          const username=req.params.username
          res.send(`Welcome ${username}`)
      })
      // `/search?keyword=express`
      app.get("/search", (req,res)=>{
          const keyword=req.query.keyword;
          res.send(  `Searching for ${keyword}`)
      })
      app.listen(PORT, ()=>{
          console.log(`Server is Started at http://localhost:${PORT}`)
      })

  ## File Structure

  ### controller.js file

  `In controller.js file`

      export const userController = (req, res)=>{
          const username=req.params.username
          res.send(`Welcome ${username}`)
      }
    
      export const searchController = (req, res)=>{
          const keyword = req.query.keyword;
          res.send(`Searching for ${keyword}`)
      }

      export const userLogin = (req, res)=>{
        res.send(`This is user Login Route`);
      }
       export const userSignup = (req, res)=>{
        res.send(`This is user Signup Route`);
      }
`In index.js file`

    import express from 'express'
    import { searchController, userController, userLogin, userSignup } from './controller'
    
    const app = express()
    const PORT = 3000
    
    app.get("/user/:username", userController)
    
    // `/search?keyword=express`
    app.get("/search", searchController)

    app.get("/user/login", userLogin);
    app.get("/user/signup", userSignup);
    
    app.listen(PORT, ()=>{
        console.log(`Server is Started at http://localhost:${PORT}`)
    })
### Route.js file
updated index.js file and route.js file (controller file will remain same)

`route.js file`

    import express from 'express'
    import { userController, userSignup } from './controller';
    
    const router = express.Router();
    router.get('/login', userController);
    router.get('/signup', userSignup)
    
    export default router;
    
`index.js file`

    import express from 'express'
    import { searchController, userController } from './controller'
    import router from './route'
    
    const app = express()
    const PORT = 3000
    
    app.get("/user/:username", userController)
    
    // `/search?keyword=express`
    app.get("/search", searchController)
    app.use('/user', router)
    
    app.listen(PORT, ()=>{
        console.log(`Server is Started at http://localhost:${PORT}`)
    })
## HTTP Methods
Express supports various HTTP methods to handle different types of client requests. The most commonly used methods in RESTful APIs are:
- GET
- POST
- PUT
- DELETE

  ### Handling a *GET* Request

- Used to fetch data from the server.
- Parameters can be passed using route parameters or query strings.

### Handling a *POST* Request

- Used to send data to the server and create a new resource.
- Requires middleware `(express.json())` to handle JSON input.

        app.post("/users", express.json(), (req, res)=>{
            const {name, email} = req.body;
            res.json({
                message:`User ${name} with email ${email} created successfully`
            })
        })

### Handling a *PUT* Request

- Used to update an existing resource.
- Uses route parameters (req.params) to identify the resource.

        app.put('/users/:id', express.json(), (req, res)=>{
            const userId = req.params.id;
            const {name, email} = req.body;
            res.json({
                message:`User ${name} with email ${email} created successfully`
            })
        })

### Handling a *DELETE* Request

- Used to remove a resource from the resource.

        app.delete('/users/:id',(req, res)=>{
            const userId = req.params,id;
            res.json({
             message:`User with id ${userId} deleted.`
            })
        })

### Handling with Multiple parameters

    app.get('/things/:name/:id', (req, res)=>{
        const {name, id} = req.params;
        res.json({id, name})
    })

##### Condition for ID

     app.get('/things/:name/:id([0-9]{5})', (req, res)=>{
            const {name, id} = req.params;
            res.json({id, name})
    })
##### Catch all Invalid Routes

    app.get('*', (req, res)=>{
        res.send('Sorry, This is an invalid URL.')
    })

## Middlewares
Middleware functions in ExpressJS are functions that execute before the final request handler. They can:
- Modify the request (req) and response (res) objects.
- End the request-response cycle.
- Call the next middleware function in the stack.

#### Middleware Workflow:

### Client Request --> Middleware -->Route Handler --> Response to Client

Middleware is essential for logging, authentication, request parsing, error handling, etc.
