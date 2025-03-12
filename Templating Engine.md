# Templating Engine in Express JS

A templating engine generates dynamic HTML by embedding Jacascript-like logic within an HTML file.

### Key Benefits:
- Keeps logic separate from presentation (HTML).
- Uses variables, loops, conditions, and functions to generate content.

in ExpressJS, templating engines are used to render views dynamically by integrating them into application.

Create new Folder with name *views*  and add file _index.ejs_  (ejs - embedded javascript)

    <html>
      <body>
        <h1>Hello, <%= userName =%>
      </body>
    </html>
      
In index.js File

    //set EJS as the view Engine
    app.set('view engine', 'ejs')
    
    app.get("/", (req, res)=>{
      const userName = 'Darshan'
      res.render('index', {userName})
    })

#### pug - package 
