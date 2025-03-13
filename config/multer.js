import multer from "multer"
export const storage = multer.diskStorage({
    destination:'uploads',
    filename:(req, file, callback)=>{
        callback(null, file.fieldname+'_'+Date.now()+'_'+file.originalname)
    }
})