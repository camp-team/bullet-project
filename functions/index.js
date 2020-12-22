const postFunction = require('./src/post.function')
const userFunction = require('./src/user.function')

exports.createPost = postFunction.createPost
exports.deletePost = postFunction.deletePost

exports.deleteUser = userFunction.deleteUser
exports.deleteUserData = userFunction.deleteUserData
