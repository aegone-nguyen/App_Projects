const users = [];

const addUser = ({id, name, room}) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existUser = users.find(user => user.room === room && user.name === name);

    if (existUser) {
        return {error: 'Username is taken'}
    }

    const user = {id, name, room};

    users.push(user);

    return {user}
}

const removedUser = (id) => {
    const index = users.findIndex((user)=>user.id === id);
    if (index !== -1) {     //Tìm giá trị Index thì nhỏ nhất là 0 nếu < 0 thì tức là không có
        return users.splice(index, 1)[0];  //Trả về phần tử [0] của 1 mảng mới mà mảng đó lấy từ mảng users vị trí index, lấy 1 giá trị 
    }
}

const getUser = (id) => {
    users.find(user => user.id === id)
}

const getUserInRoom = (room) => {
    users.filter(user => user.room === room); // Lấy toàn bộ user trong cùng 1 room
}

module.exports = {addUser, removedUser, getUser, getUserInRoom}