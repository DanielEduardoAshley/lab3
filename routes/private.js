
const express = require('express');
const privateRouter = express.Router();
const UserServices = require('../services/UserServices')
const CommentServices = require('../services/CommentServices')
const PostServices = require('../services/PostServices')
/*USER - Private
PUT /user/:user_id
DEL /user/:user_id
*/

privateRouter.put('/user/:user_id', ((req,res)=>{
    // const {user_id} = req.params
    // const {username} = req.params
    // const {email} = req.params
    // const {password} = req.params
    // const obj = {username, email, password}
    // UserServices.read(user_id).then((data)=>{
    //     console.log(data)
    //     const newObj = Object.assign(...data,obj )
    //     console.log('new objecy',newObj)
    //     return newObj
    // }).then((newObj)=>{
    //     const {username} = newObj.username
    //     const {email} = newObj.email
    //     const {password} = newObj.password
    //     UserServices.update(username, email, password, user_id)
    // })
    const {username} = req.body
    const {email} = req.body
    const {password} = req.body
    const {user_id} = req.params


    UserServices.update(username, email, password, user_id).then(()=>{
        res.json('User Updated')
    })
    .catch((e)=>{
        console.log(e)
    })

    
    

}))

privateRouter.delete('/user/:user_id', ((req, res)=>{
    const {user_id} = req.params

    UserServices.delete(user_id).then(()=>{
        res.json('User deleted')

    })


}))




/*POST - Private
POST /post
PUT /post/:post_id
DEL /post/:post_id
*/

privateRouter.put('/post/:post_id', (req,res)=>{
    
    // const {post_id} = req.params
    // PostServices.read(post_id)
    // .then((data)=>{
    //     console.log('thisdata',data)
    //     const obj = {
    //         title : data.title,
    //         body :  data.body,
    //     }
    //     return obj
    // })
    // .then((obj)=>{
    //     const {title} = req.body
    //     const {body} = req.body
    //     const secObj = {
    //         title : title,
    //         body  : body,
        
    //     }
    //     // console.log(obj)
    //     const newObj  = Object.assign(secObj,obj )

    //     return newObj
    // })
    // .then((newObj)=>{
    //     console.log(newObj)
    //     const {title} = newObj
    //     const {body}  = newObj
    //    return PostServices.update(title, body, post_id)
       
    
    //     })
    //     .then(()=>{
    //         res.json('Updated Post')
    //     })
    //     .catch((e)=>{
    //         console.log(e)
    //     })
    const {token} = req.headers
    PostServices.getIDfromToken(token).then((author)=>{

        return author
})
.then((authorID)=>{
    const author = authorID.id
    const {title} = req.body
    const {body} = req.body
    const {post_id} = req.params
    PostServices.update(author, title, body, post_id)

}).then(()=>{
    res.json('Post Updated')
})
    
       
     
    })

    
    


    

    


privateRouter.delete('/post/:post_id', ((req, res)=>{
    const {post_id} = req.params
    PostServices.delete(post_id).then(()=>{

        res.json('Post Deleted')

    })


}))


/*COMMENT
POST /comment
PUT /comment/:comment_id
DEL /comment/:comment_id
*/

privateRouter.post('/comment', (req, res)=>{
    const {title} = req.body
    const {body} = req.body
    const {token} = req.headers
    console.log(title)
    console.log(body)
    CommentServices.getIDfromToken(token).then((authorID)=>{
    const author = authorID.id
    const {post_id} = req.body

    console.log(post_id)
        return CommentServices.create(author, post_id, title, body)

    }).then(()=>{
        res.json('Post created')

    })
    .catch((e)=>{
        console.log(e)

    })

})



privateRouter.put('/comment/:comment_id', (req, res)=>{
    const {title} = req.body
    const {body} = req.body
    const {comment_id} = req.params
    CommentServices.update( title, body, comment_id)
    .then(()=>{
    res.json('Comment Updated')
})
})




privateRouter.delete('/comment/:comment_id', (req, res)=>{
    const {comment_id} = req.params
    CommentServices.delete(comment_id).then(()=>{
        res.json('comment deleted')
    })



})



module.exports ={
    privateRouter,

}