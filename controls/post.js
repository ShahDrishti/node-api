const getPosts = (req , res) => {
    res.json(
        {
            posts: [{title: 'First Post' , content: 'This is the first post'}]
        }
    );
}
module.exports={
    getPosts
}