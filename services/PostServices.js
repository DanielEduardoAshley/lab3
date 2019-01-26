const {db} = require('./ConnectionServices');
const PostServices = {}



PostServices.create=( title, body)=>{
return db.none('INSERT INTO posts (  title, body) VALUES ( title=${title}, body=${body})', {title, body})
}


PostServices.read=(post_id)=>{
return db.one('SELECT * FROM posts WHERE posts.id = ${post_id}', {post_id})
}


PostServices.update=(author, title, body, post_id)=>{
return db.result('UPDATE posts SET  title=${title}, body=${body} WHERE posts.id =${post_id}', { title, body, post_id}) 
}


PostServices.delete=(post_id)=>{
return db.none('DELETE FROM comments WHERE post_id =comment_id ; DELETE FROM posts WHERE posts.id= ${post_id}', {post_id})  
}



/*GET /post/:post_id/comments
GET /post/:post_id/comments/:comment_id*/

PostServices.readAllComments=(post_id)=>{
return db.any('SELECT c.* FROM comments c JOIN posts ON (c.post_id = posts.id) WHERE posts.id = ${post_id} ', {post_id})

}

PostServices.readAcomment=(post_id, comment_id)=>{
return db.any('SELECT c.* FROM comments c JOIN posts p ON (c.post_id = p.id) WHERE c.id = ${comment_id} AND p.id = ${post_id}', {post_id, comment_id})


}
module.exports = PostServices