

const authentication =(req, res, next)=>{
    const {token} = req.headers
    console.log(req.headers.token)
    UserServices.authentication(token).then((tokenCheck)=>{
        console.log(tokenCheck)
        if(tokenCheck['rows'].length > 0){
            next()
        }
        else{
            res.json('Please enter the correct token')
        }
    })
//     const {post_id} = req.params
// //    const {user_id} = req.params
//     console.log('post',post_id)
//     // console.log('user', user_id)
//     console.log('hhh')
//     const {user_id} = req.params
//     const {comment_id} = req.params
//     console.log(user_id)
// //     if(req.headers.token){
// //         console.log(req.headers)
// //     }

// if(user_id){
//     UserServices.read(user_id).then((data)=>{
//         if(data.token === req.headers.token){
//             next()
//         }else{
//             res.json('Please Enter the correct password')
//         }
//     })  

// }
// else if(post_id){
//     PostServices.read(post_id).then((data)=>{
//         return data.author
//     }).then((posters_user_id)=>{
//     return UserServices.read(posters_user_id)
//     }).then((userdata)=>{
//         if(userdata.token === req.headers.token){
//             next()
//         }
//         else{
//             res.json('Please enter the correct password')
//         }
//     })

// }
// else if(comment_id){
//     CommentServices.read(comment_id).then((data)=>{
//         return UserServices.read(data.author)
//     }).then((comment_user_id)=>{
//         if(comment_user_id.token === req.headers.token){
//             next()
//         }
//         else{
//             res.json('Please enter the correct password')
//         }

    // })}

}

module.exports= {
    authentication,
}

"Keep and store this temporary token : 0b96f9b0-2035-11e9-a8a7-c1e016ba2094"