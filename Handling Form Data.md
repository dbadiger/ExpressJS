# Handling Form Data

using URL-encoded form handling (x-www-form-urlencoded)

To parse the url-encoded data, we write `app.use(express.urlencoded({extended:true}))`

    //URL-encoded form
    app.use(express.urlencoded({extended:true}))
    app.post('/form', (req, res)=>{
        console.log(req.body)
        res.send('URL Encoded Form Submitted')
    })

To parse normal form data, we have to install `multer` package
`npm I multer`

    app.use(upload.array())
    app.post('/form', (req, res)=>{
        console.log(req.body);
        res.send("Normal Form Received")  
    })
Send (upload) file from form 
Create one folder with `uploads` name, and all the images will be stored in that folder.

    //form With file, and store the uploaded file in storage
    const storage = multer.diskStorage({
        destination:'uploads',
        filename:(req, file, callback)=>{
            callback(null, file.fieldname+'_'+Date.now()+'_'+file.originalname)
        }
    })
    const upload= multer({
        storage:storage,
        limits:{
            fileSize:1024000    // Max file size 1MB, 2048000=2MB
        }
    })
    app.use(upload.single('image'));
    app.post('/form',(req, res)=>{
        console.log(req.body);
        console.log(req.file);
        res.send("Form submitted with file.") 
    })
