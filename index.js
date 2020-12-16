const groceryInput = document.querySelector('#task-input');
const groceryListTable = document.querySelector('#grocery-list');


loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getGroceryList);


}


function signUpForm(){
    document.getElementById("login-h1").style.display = "none"
    document.getElementById("signup-h1").style.display = "block" 
    document.getElementById("logInButton").style.display = "none"
    document.getElementById("signUpForm").style.display = "block"
    document.getElementById("name").style.display = "block" 
    document.getElementById("signUpButton").style.display = "none"
}

function logIn(){
    
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    
    if(email=="" || password==""){
        alert("Enter Email and Password")
        return
    }

    var userList =JSON.parse(localStorage.getItem('three-user-list'))
    
    if(userList!=null){
        
        for(var i=0; i< userList.length; i++){
            if(userList[i].email == email && userList[i].password == password){
                window.location.pathname = "/grocery-list.html"
                localStorage.setItem("loged-in-user",email)
            }else if(userList[i].email == email && userList[i].password != password){
                alert("Enter Correct password or Email!")
            }else if(userList[i].email != email && userList[i].password != password){
                alert("User Not exists. Create account!")
            }
        }
    }else{
        alert("User Not exists. Create account!")
    }

}

function groceryListForm(){
    window.location.pathname = "/grocery-list.html"
}

function signUp(){

    
    var name = document.getElementById("name").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value

    var threeUserList;

    if(name==''||email==''||password==''){
        alert("Name , Email & Passwords are required")
    }else{

        if(localStorage.getItem('three-user-list')===null){
            threeUserList = []
            threeUserList.push({'name':name,'email':email,'password':password,'groceryList':''})
            localStorage.setItem('three-user-list',JSON.stringify(threeUserList))
        }else{
            debugger
            threeUserList = JSON.parse(localStorage.getItem('three-user-list'))
            if(threeUserList.length>2){
                threeUserList[2] = {'name':name,'email':email,'password':password,'groceryList':''}
            }else{
                threeUserList.push({'name':name,'email':email,'password':password,'groceryList':''})
            }
            localStorage.setItem('three-user-list',JSON.stringify(threeUserList))
        }
        location.reload()
    }
}

function logOut() {
    window.location.pathname = '/index.html'
}


// Add Task
function addTask() {

    if(groceryInput.value === '') {
      alert('Add a task');
    }else{
          // Create tr element
        const tr = document.createElement('tr');
        
        const td1 = document.createElement('td')
        const td2 = document.createElement('td')
        
        //create Text node append to td
        td1.appendChild(document.createTextNode(groceryInput.value))

        const inputEdit = document.createElement('input')
        inputEdit.type = 'button'
        inputEdit.className = 'edit-delete'
        inputEdit.value = 'Edit'
        inputEdit.id = 'edit-btn'
        inputEdit.addEventListener("click", function(){
            editGroceryItem(groceryInput.value)
        })

        const inputDelete = document.createElement('input')
        inputDelete.type = 'button'
        inputDelete.className = 'edit-delete'
        inputDelete.value = 'Delete'
        inputDelete.id = 'delete-btn'
        inputDelete.addEventListener("click", function(){
            deleteGroceryItem(groceryInput.value)
        })

        td2.appendChild(inputEdit)
        td2.appendChild(inputDelete)

        tr.appendChild(td1)
        tr.appendChild(td2)

        groceryListTable.appendChild(tr);

        // Store in LS
        storeTaskInLocalStorage(groceryInput.value);

        // Clear input
        groceryInput.value = '';
        location.reload()
    } 
}


function editGroceryItem(editItem){
    
}
function deleteGroceryItem(deleteItem){
    let userList = JSON.parse(localStorage.getItem('three-user-list'))
    let groceryList;
    for(let i=0; i<userList.length; i++){
        if(userList[i].email == localStorage.getItem('loged-in-user')){
            
            groceryList = userList[i].groceryList
            for(let j=0; j< groceryList.length;i++){
                if(userList[i].groceryList[j] == deleteItem){
                    userList[i].groceryList.splice(j,1)
                    localStorage.setItem('three-user-list',JSON.stringify(userList))
                    location.reload()
                    getGroceryList()
                }
            }
        }
    }
}

function storeTaskInLocalStorage(groceryName){

    let userList = JSON.parse(localStorage.getItem('three-user-list'))

    let groceryList;

    for(let i=0; i<userList.length; i++){
        if(userList[i].email == localStorage.getItem('loged-in-user')){
            if(userList[i].groceryList == ''){
                groceryList = [];
                groceryList.push(groceryName)
                userList[i].groceryList = groceryList
                localStorage.setItem('three-user-list',JSON.stringify(userList))
                return
            }else{
                groceryList = userList[i].groceryList
                groceryList.push(groceryName)
                userList[i].groceryList = groceryList
                localStorage.setItem('three-user-list',JSON.stringify(userList))
                return
            }
        }
    }

}

function getGroceryList(){
    
    let groceryList = [];
    let userList = JSON.parse(localStorage.getItem('three-user-list'))

    for(let i=0; i<userList.length; i++){
        if(userList[i].email == localStorage.getItem('loged-in-user')){
            if(userList[i].groceryList == ''){
                groceryList = [];
            }else{
                groceryList = userList[i].groceryList
            }
        }
    }

    groceryList.forEach(groceryName => {

        const tr = document.createElement('tr');
        
        const td1 = document.createElement('td')
        const td2 = document.createElement('td')
        
        //create Text node append to td
        td1.appendChild(document.createTextNode(groceryName))

        const inputEdit = document.createElement('input')
        inputEdit.type = 'button'
        inputEdit.className = 'edit-delete'
        inputEdit.value = 'Edit'
        inputEdit.id = 'edit-btn'
        inputEdit.addEventListener("click",function(){
            editGroceryItem(groceryName)
        })

        const inputDelete = document.createElement('input')
        inputDelete.type = 'button'
        inputDelete.className = 'edit-delete'
        inputDelete.value = 'Delete'
        inputDelete.id = 'delete-btn'
        inputDelete.addEventListener("click", function(){
            deleteGroceryItem(groceryName)
        })
        td2.appendChild(inputEdit)
        td2.appendChild(inputDelete)

        tr.appendChild(td1)
        tr.appendChild(td2)

        groceryListTable.appendChild(tr);
    });

}