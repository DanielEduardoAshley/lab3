const {db} = require('./ConnectionServices'),
CommentServices = {}

CommentServices.create=(author, post_id, title, body)=>{
return db.none('INSERT INTO comments (author, post_id, title, body) VALUES (${author}, ${post_id}, ${title}, ${body})', {author, post_id, title, body})

}


CommentServices.read=(comment_id)=>{
return  db.any('SELECT * FROM comments WHERE comments.id = ${comment_id}', {comment_id})
}


CommentServices.update=(title, body, comment_id)=>{
return  db.none('UPDATE comments SET  title=${title}, body=${body} WHERE comments.id =${comment_id}', {title, body, comment_id})
}


CommentServices.delete=(comment_id)=>{
return db.none('DELETE FROM comments WHERE comments.id =${comment_id}', {comment_id})
}


CommentServices.getIDfromToken=(token)=>{
return db.one('SELECT users.id FROM users WHERE token = ${token}', {token})


}
module.exports = CommentServices