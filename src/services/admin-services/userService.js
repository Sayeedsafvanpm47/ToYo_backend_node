const userRepository = require('../../repositories/admin-repositories/userRepository')


const blockUser = async (email)=>{
    return userRepository.blockUser(email)
}

const listAllUsers = async ()=>{
    return userRepository.listAllUsers()
}

module.exports = {
    blockUser,listAllUsers
}