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

export const getUser = (id) => users.find((user) => user.id === id);

export const getUsersInRoom = (room) => users.filter((user) => user.room === room);

