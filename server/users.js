const users = []

// locate user in a game
// pre condition: no two players have the same id && same room
export const addUser = ({ id, room }) => {
  
    const user = { id, room };
  
    users.push(user);
  
    return { user }

}

export const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

export const getUser = (id) => {
  console.log('[getUser] id', id)
  console.log('[getUser] users', users)
  const userFound = users.find((user) => user.id === id);
  if (userFound === undefined) {
    return { error: 'user not found' }
  } else {
    return userFound
  }
}

export const getUsersInRoom = (room) => users.filter((user) => user.room === room);

