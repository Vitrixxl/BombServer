const { getPartyArray, removeUser } = require('./partyModule.js');
let users = []
const getUsers = () => users;
const userJoining = (user, partyId) => {
    const currentUser = users.find(u => u.id === user.id)
    if (currentUser) {
        currentUser.partyId = partyId;
        return
    }
    console.log(users)

}
const addUser = (user) => {
    users.push({ id: user });
    console.log(users)
}
const handleLeaving = (id) => {
    const user = users.find(u => u.id === id)
    if (!user) return
    user.partyId ? removeUser(user.id, user.partyId) : null

    users = users.filter(u => u.id !== user.id)
    console.log(getUsers())
}
module.exports = {
    getUsers,
    addUser,
    handleLeaving,
    userJoining
};