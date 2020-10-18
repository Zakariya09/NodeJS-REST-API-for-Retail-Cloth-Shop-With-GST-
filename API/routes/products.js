const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const ProductController = require('../controllers/productController');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'upload');
    },
    filename: function(req, file, cb){ 
        // cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
        cb(null, file.originalname);
    }
})
const fileFilter = (req, file, cb) => {
//reject file
if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
cb(null, true);
}else{
cb(null, false);
}
}
const upload = multer({storage:storage , limits: {fileSize: 1024 * 1024 * 5}, fileFilter: fileFilter} );

router.get('/', ProductController.getProducts);

router.post('/', checkAuth, upload.single('productImage'), ProductController.uploadProducts);

router.get('/:productId', ProductController.getProductByID);

router.patch('/:productId', checkAuth, ProductController.updateProduct);

router.delete('/:productId', checkAuth, ProductController.deleteProduct);
module.exports = router;