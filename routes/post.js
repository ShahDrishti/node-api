const express = require("express")
const postController = require("../controls/post")


const router = express.Router();

router.get('/',postController.getPosts)

module.exports=router;

//the below thing will show error : Router.use() requires a middleware function but got a Object
    
// module.exports={
//     router
// }

