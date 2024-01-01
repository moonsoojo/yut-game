const users = []

// user
// spectator - team = -1
// player - team = 0 or 1
// separate variable for players
export const addUser = ({ id, name, room }) => {
  try {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
  
    const existingUser = users.find((user) => user.name === name && user.room === room)
  
    if (existingUser) {
      throw 'Username is taken'
    }
  
    const user = { id, name, room };
  
    users.push(user);
  
    return { user }
  } catch (error) {
    return { error }
  }
}

export const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

export const getUser = (id) => users.find((user) => user.id === id);

export const getUsersInRoom = (room) => users.filter((user) => user.room === room);

