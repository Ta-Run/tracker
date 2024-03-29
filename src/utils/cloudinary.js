import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
  cloud_name: "drvlwahhg",
  api_key: 716838172415287,
  api_secret: "TjD_SO60NxTd8-WgFFAJnuA8H_g"
});

const uploadOnCloudinary = async (localFilePath) => {

    try {
        if (!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
                                                             
        fs.unlinkSync(localFilePath)

        return response;
    } catch (error) {
        console.log(error)
        fs.unlinkSync(localFilePath)
        return 'no image';
    }
}

export {uploadOnCloudinary}