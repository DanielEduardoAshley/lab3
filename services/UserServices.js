const {db} = require('./ConnectionServices');
const bcrypt = require('bcrypt');
UserServices = {}

UserServices.create=(username, email, password, token=null)=>{
    return bcrypt.hash(password, 10).then((hash)=>{
                const ePass = hash
                return db.none('INSERT INTO users (username, email, password, token) VALUES (${username}, ${email}, ${ePass}, ${token})', {username, email, ePass, token})
    })


}


UserServices.read=(user_id)=>{
return db.one('SELECT * FROM users WHERE users.id = ${user_id}', {user_id})
  
}

UserServices.readLogin=(username)=>{
return db.one('SELECT * FROM users WHERE username= ${username}', {username})    
}


UserServices.update = (username,email,password, user_id) =>{
return db.result('UPDATE users SET username = ${username}, email =${email}, password=${password} WHERE users.id =${user_id}' , {username, email, password, user_id})
   
}


UserServices.delete=(user_id)=>{
return db.none('DELETE FROM users WHERE users.id =${user_id}', {user_id})
   
}


/*GET /user/:user_id/posts/:post_id
GET /user/:user_id/comments
GET /user/:user_id/comments/:comment_id*/

UserServices.readApost=(user_id, post_id)=>{
        return db.any('SELECT posts.* FROM posts JOIN users ON (users.id = posts.author) WHERE users.id = ${user_id} AND posts.id=${post_id}', {user_id, post_id})
      
    }

UserServices.readAllposts=(user_id)=>{
        return db.any('SELECT posts.* FROM posts JOIN users ON (users.id = posts.author) WHERE users.id = ${user_id}', {user_id})
      
    }

UserServices.readAllComment=(user_id)=>{
        return db.any('SELECT comments.* FROM comments JOIN users ON (users.id = comments.author) WHERE users.id = ${user_id}', {user_id})
          
        }

UserServices.readAComment=(user_id, comment_id)=>{
        return db.any('SELECT c.* FROM comments c JOIN users ON (c.author = users.id) WHERE users.id = ${user_id} AND c.id=${comment_id}', {user_id, comment_id})
          
        }


UserServices.authentication=(token)=>{
    return db.result('SELECT token FROM users WHERE users.token = ${token}', {token})
}        

UserServices.updateToken=(token, username)=>{
    return db.none('UPDATE users SET token = ${token} WHERE username = ${username}', {token, username})
}
module.exports = UserServices