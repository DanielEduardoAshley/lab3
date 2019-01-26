const express = require('express');
const publicRouter = express.Router();
const PostServices = require('../services/PostServices');
const UserServices = require('../services/UserServices');
const CommentServices = require('../services/CommentServices');
const bcrypt = require('bcrypt');
const uuid = require('uuid/v1');
console.log(UserServices)

//USERS-PUBLIC
/*POST /user
GET /user/:user_id
GET /user/:user_id/posts
GET /user/:user_id/posts/:post_id
GET /user/:user_id/comments
GET /user/:user_id/comments/:comment_id
POST /user/login
*/

publicRouter.post('/user', (req,res)=>{
    const {username} = req.body
    console.log(username)
    const {email} = req.body
    console.log(email)
    const {password} = req.body
    console.log(password)
    UserServices.create(username, email, password, token=null).then((data)=>{
        res.json(`user created`)
        
    })
    .catch((e)=>{
        console.log(e)
        res.json('error with /user')
    })

})



publicRouter.get('/user/:user_id',(req, res)=>{
    const {user_id} = req.params
    console.log(req.headers)

    UserServices.read(user_id)
    .then((data)=>{
        if(data.length===0){
            res.json('user does not exist')
        }
        console.log( data)
    //    console.log(data.id)
        delete data.email
        delete data.password
        delete data.token
        res.json(data)

    })
    .catch((e)=>{
        console.log(e)
        res.json('error with /user/:user_id')
    })

})

publicRouter.get('/user/:user_id/posts',(req, res)=>{
    const {user_id} = req.params
    UserServices.readAllposts(user_id)
    .then((data=>{
        res.json(data)

    }))
    .catch((e)=>{
        console.log(e)
        res.json('error with /user/:user_id/posts ')
    })
    

})

publicRouter.get('/user/:user_id/posts/:post_id',(req, res)=>{
    const {user_id} = req.params
    const {post_id} = req.params

    UserServices.readApost(user_id, post_id).then((data=>{

        res.json(data)

    }))
    .catch((e)=>{
        console.log(e)
        res.json('error with /user/:user_id/posts/:post_id')

    })

})



publicRouter.get('/user/:user_id/comments',(req, res)=>{
    const {user_id} = req.params
    UserServices.readAllComment(user_id)
    .then((data=>{

        res.json(data)

    }))
    .catch((e)=>{
        console.log(e)
        res.json('error with get /user/:user_id/comments ')

    })


})

publicRouter.get('/user/:user_id/comments/:comment_id',(req, res)=>{
    const {user_id} = req.params
    const {comment_id} = req.params
    UserServices.readAComment(user_id, comment_id)
    .then((data=>{
        res.json(data)


    }))
    .catch((e)=>{
        console.log(e)
        res.json('Error with public get request : /user/:user_id/comments/:comments_id')


    })





})


publicRouter.post('/user/login',(req, res)=>{
    const {password} = req.body
    const {username} = req.body
    const {epass} = req.body

    UserServices.readLogin(username)
    .then((data)=>{
            console.log(data)      
        // if(!data){
        //     res.json(`USERNAME ${username} does not exist`)
        // }
            // res.json({'John' :  data})
            const epass = data.password
            console.log(data.password)
        return bcrypt.compare(password, epass)
       
    }, ((data)=>{
        if(!data.username){
            res.json(`USERNAME ${username} does not exist`)
        }
    }))
    .then((passRight)=>{
        if(passRight){
            const token = uuid();
            UserServices.updateToken(token, username)
            res.json(`Keep and store this temporary token : ${token}`)
        }
        else if(!passRight){
            res.json('Wrong Password')
        }
    })
    .catch((e=>{
            console.log(e)
            res.json('Something went wrong')
    }))

});







/*POST-Public
GET /post/:post_id
GET /post/:post_id/comments
GET /post/:post_id/comments/:comment_id
*/

publicRouter.get('/post/:post_id',(req, res)=>{
    const {post_id} = req.params
    PostServices.read(post_id)
    .then((data)=>{

        res.json(data)

    }).catch((e)=>{
        console.log(e)
        res.json('error with get public post_id route')
    })
} )

publicRouter.get('/post/:post_id/comments',(req, res)=>{
    const {post_id} = req.params
    PostServices.readAllComments(post_id).then((data)=>{
        res.json(data)



    })

})


publicRouter.get('/post/:post_id/comments/:comment_id',(req, res)=>{
    const {post_id} = req.params
    const {comment_id} = req.params
    PostServices.readAcomment(post_id, comment_id).then((data)=>{
        res.json(data)


    })

} )



/*COMMENT-Public
GET /comment/:comment_id
*/


publicRouter.get('/comment/:comment_id',(req, res)=>{
    const {comment_id} = req.params
    CommentServices.read(comment_id).then((data)=>{
        res.json(data)


    })

} )


module.exports = {
    publicRouter,


}