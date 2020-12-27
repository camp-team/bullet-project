const postFunction = require('./src/post.function')
const userFunction = require('./src/user.function')
const sendMail = require('./src/sendMail')

exports.createPost = postFunction.createPost
exports.deletePost = postFunction.deletePost

exports.deleteUser = userFunction.deleteUser
exports.deleteUserData = userFunction.deleteUserData

exports.sendMail = sendMail.sendMail
