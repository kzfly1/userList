function clearList(){
    const userList = document.getElementById('user_list');
    while (userList.firstChild) {
        userList.removeChild(userList.firstChild)
    }
}

function appendUsers(users) {
    users.forEach(function(user) {
        const li = document.createElement('li');
        li.innerHTML = `${user.name} ${user.age}`
        li.setAttribute('data-id', user.id)
        //create button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click',()=>{
            deleteUserById(user.id)
        })
        li.appendChild(deleteButton);
        document.getElementById('user_list').appendChild(li);
    });
}

function getList() {
    console.log('getList is fired')
    const url = 'http://localhost:8000/api/users';
    axios.get(url)
    .then(function(res){
        console.log('res', res);
        const users = res.data.data;
        clearList();
        appendUsers(users);
    })
    .catch(function(err){
        console.error('Error fetching user list:', err)
    })
}
function postUser() {
    console.log('postUser is fired');
    const url = 'http://localhost:8000/api/users';
    const nameInput = document.getElementById('username');
    const nameValue = nameInput.value;
    const ageInput = document.getElementById('age');
    const ageValue = ageInput.value;
    console.log(nameValue, ageValue);
    if(!nameValue || !ageValue) return;
    const body = {
        name: nameValue,
        age: ageValue,
    };
    axios
        .post(url,body)
        .then(function(res){
            const updatedUsers = res.data.data;
            console.log('updatedUsers',updatedUsers);
            clearList();
            appendUsers(updatedUsers);
        })
        .catch((err)=>{
        console.error('Error adding user:',err)
    })
}


function deleteList() {
    console.log('deleteList is fired')
    const url = 'http://localhost:8000/api/users';
    axios.delete(url)
    .then(()=>{
        console.log('user list cleared in backend')
        getList()
    })
    .catch((err)=>{
        console.log('Error clearing user list:',err)
    })
}

function deleteUserById(userId) {
    console.log('deleteUserById is fired');
    const url = `http://localhost:8000/api/users/${userId}`;
    axios.delete(url)
    .then((res)=>{
        console.log(userId + 'deleted')
        getList(); //refresh list after deletion
    })
    .catch((err)=>{
        console.error(`Error deleting user with Id ${userId}`,err)
    })
}
