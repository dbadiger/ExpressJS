# Serving Static File

Create new folder with name *public* andd file with *any name (example: mytext.txt)*

In index.js file:

    app.use(express.static('public'))

In url http://localhost:3000/mytext.txt, we get details present inside the mytext.txt file.

create new folder *images*, add any image (eg: image.jpeg)

In index.js file:

    app.use(express.static('images'))

In url http://localhost:3000/image.jpeg, we get image.

#### Export folders in virtual path

    import express from 'express'
    const app=express()
    const PORT=3000

    //Give virtual paths to access static files
    app.use('/public', express.static('public'))
    app.use('/images', express.static('images'))
    
    app.get('/', (req, res)=>{
      res.send('Hello ExpressJS')
    })
    
    app.listen(PORT, ()=>{
      console.log('Server is Started')
    })

In url:
http://localhost:3000/images/image.jpeg
http://localhost:3000/public/mytext.txt
