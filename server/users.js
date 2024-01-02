const users = []

// locate user in a game
// pre condition: no two players have the same id && same room
export const addUser = ({ id, room }) => {
  try {
    room = room.trim().toLowerCase();
  
    const existingUser = users.find((user) => user.id === id && user.room === room)
  
    if (existingUser) {
      throw 'User exists already'
    }
  
    const user = { id, room };
  
    users.push(user);
  
    return { 
      addUserResponse: {
        status: 'ok',
        user
      }
    }
  } catch (error) {
    return { 
      addUserResponse: {
        status: 'error',
        message: error 
      }
    }
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

