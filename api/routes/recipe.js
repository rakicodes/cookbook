const express = require('express'); 
const { addRecipe, getRecipe, getRecipes, getUserRecipes, editRecipe, deleteRecipe } = require('../controllers/recipe');
const router = express.Router();
const upload = require("../middleware/multer");
const { protect } = require("../middleware/auth")

router.post('/', protect, upload.single("image"), addRecipe)
router.get('/user/:id', getUserRecipes)
router.get('/:id', getRecipe)
router.get('/', getRecipes)
router.put('/edit/:id', protect, upload.single("image"), editRecipe)
router.delete('/delete/:id', protect, deleteRecipe)

module.exports = router