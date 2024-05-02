var arrayList=[]
try {
    var getfromlocalStorage = localStorage.getItem("todoList");

    if (getfromlocalStorage !== null) {
        arrayList = JSON.parse(getfromlocalStorage);
        rendertask();
    }
} catch (error) {
    // console.log(error.name)
    // console.log(error.message)
    console.error("Error accessing localStorage:", error);
}
const inputbox=document.getElementById('inputbox')
const con=document.getElementById(container)


const addtask=()=>{
    debugger;
    const inputValue=inputbox.value;
    // console.log(inputValue)
    const todoObject = {
        taskId: arrayList.length + 1,
        taskName: inputValue
    };
    arrayList.push(todoObject);
    localStorage.setItem("todoList", JSON.stringify(arrayList));
    rendertask()
}
console.log(addtask)
const rendertask=()=>{
    debugger;
    document.getElementById("container").innerHTML= "";
   
    for(var index = 0;index<arrayList.length;index++){
        let ul = document.createElement("ul");
        let li = document.createElement("li");
        li.classList.add("check")
        let editIcon=document.createElement("i");
        editIcon.classList.add("fa-solid");
        editIcon.classList.add("fa-pen-to-square");
        editIcon.addEventListener('click',edit);
        editIcon.taskId=arrayList[index].taskId;

        let deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-solid");
        deleteIcon.classList.add("fa-trash");
        deleteIcon.addEventListener("click",deleteTask);
        deleteIcon.taskId=arrayList[index].taskId;

        li.textContent = arrayList[index].taskName;
        li.appendChild(editIcon);
        li.appendChild(deleteIcon);

        ul.appendChild(li);
        document.getElementById("container").appendChild(li);
    }
    
}
const edit=(event)=>{
    debugger;
    const addTask=document.getElementById(add)
    const save=document.getElementById(saveTask)
    const saveindex=document.getElementById('saveindex')
    var obj = arrayList.find(m=>m.taskId == event.target.taskId)
    let index = -1;
    for (let i = 0; i < arrayList.length; i++) {
        if (arrayList[i].taskId == event.target.taskId) {
            index = i;
            break;
        }
    }
    if (index !== -1) {
        // Get the task object from the arrayList
        const obj = arrayList[index];
        
        // Assuming 'inputbox' is the correct element to get the taskName
        const inputbox = document.getElementById('inputbox');
        inputbox.value = obj.taskName;

        // Set other necessary values
        saveindex.value = index;
    localStorage.setItem("todoList", JSON.stringify(arrayList));
    add.style.display="none"
    saveTask.style.display="block"
    }
    // saveindex.value=arrayList[index]
    savetask()
    rendertask()
}
const savetask=()=>{
    debugger;
    console.log("I am clicked")
    const saveindex=document.getElementById('saveindex')
    const saveindexvalue = parseInt(saveindex.value, 10);

    // Check if the converted 'saveindexvalue' is a valid index in the 'arrayList'
    if (!isNaN(saveindexvalue) && saveindexvalue >= 0 && saveindexvalue < arrayList.length) {
        // Get the HTML element with the ID 'inputbox'
        const inputbox = document.getElementById('inputbox');

        // Update the task name in the 'arrayList' at the specified index
        arrayList[saveindexvalue].taskName = inputbox.value;
    
    // arrayList.push(input)
    }
    // const addTask=document.getElementById(add)
    // const save=document.getElementById(saveTask)
    // saveTask.style.display="none"
    // add.style.display="block"
    
    rendertask()
}
console.log(event)
const deleteTask=(event)=>{
    debugger;
    var index = arrayList.findIndex(m=>m.taskId == event.target.taskId);
    arrayList.splice(index,1);
    localStorage.setItem("todoList", JSON.stringify(arrayList));
    rendertask()
}

// const addButton = document.getElementById('add-button');
// addButton.addEventListener('click', addTask);



