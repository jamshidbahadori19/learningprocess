const express = require("express");
const router = express.Router()
const {login, signUp,SearchPhoto,likePhoto,getSavedPhotos,deleteSavedPhotos} = require("../controllers/controllers") 
const auth = require("../middleware/Auth")


router.post("/signup",signUp)
router.post("/login",login)
router.get("/search/photos",auth,SearchPhoto)
router.put("/likePhoto",auth,likePhoto)
router.get("/saved-photos",auth,getSavedPhotos)
router.delete("/delete-photos/:id",auth,deleteSavedPhotos)

module.exports = router
