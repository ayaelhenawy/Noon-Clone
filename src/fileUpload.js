import {v4 as uuidv4} from 'uuid'
import multer  from 'multer'


export const fileUpload=(folderName)=>{

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${folderName}`)
        },
        filename: function (req, file, cb) {
            cb(null,uuidv4()+ file.originalname)
        }
    })
    
    
    function fileFilter (req, file, cb) {
        if(file.mimetype.startsWith('image')){
            cb(null, true)
        }
        else cb(null, false)
        }
    
    const upload = multer({ storage ,fileFilter,limits:{
        fileSize:1*1024*1024,
    }})

    return upload;
}

export function uploadSingleFile (fileName,folderName){


        return fileUpload(folderName).single(fileName)
}


export function uploadMixOfFile (arrayOfFiles,folderName){
        return fileUpload(folderName).fields(arrayOfFiles)
}