import multer from 'multer';

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    // Create a unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    // Replace spaces in the original name with hyphens for safety
    const safeOriginalName = file.originalname.replace(/\s+/g, '-');
    
    callback(null, uniqueSuffix + '-' + safeOriginalName);
  },
});

const upload = multer({ storage });

export default upload;