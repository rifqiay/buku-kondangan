const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Creating uploads folder if not already present
// In "uploads" folder we will temporarily upload
// image before uploading to cloudinary
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(locaFilePath, publicId) {
  return cloudinary.api.resources(
    { type: "upload", prefix: publicId },
    function (error, result) {
      if (result.resources.length > 0) {
        cloudinary.uploader.destroy(publicId, (error, result) => {
          if (error) {
            return { message: "Fail" };
          }
        });
      }

      // upload your new image
      return cloudinary.uploader
        .upload(locaFilePath, { public_id: publicId })
        .then((result) => {
          // Remove file from local uploads folder
          fs.unlinkSync(locaFilePath);
          return {
            message: "Success",
            url: result.url,
          };
        })
        .catch((error) => {
          return { message: "Fail" };
        });
    }
  );
}

module.exports = uploadToCloudinary;
