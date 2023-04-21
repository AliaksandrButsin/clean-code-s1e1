//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput=document.getElementById('add-task');//Add a new task.
const addButton=document.getElementsByTagName('button')[0];//first button
const incompleteTaskHolder=document.getElementById('todo-tasks');//ul of #todo-tasks
const completedTasksHolder=document.getElementById('completed-tasks');//completed-tasks


//New task list item
const createNewTaskElement=function(taskString){

    let listItem = document.createElement('li');

    //input (checkbox)
    let checkBox = document.createElement('input');//checkbx
    //label
    let label = document.createElement('label');//label
    //input (text)
    let editInput = document.createElement('input');//text
    //button.edit
    let editButton = document.createElement('button');//edit button

    //button.delete
    let deleteButton = document.createElement('button');//delete button
    let deleteButtonImg = document.createElement('img');//delete button image


    listItem.className = 'li-li';

    label.innerText = taskString;
    label.className = 'label-task task';

    //Each elements, needs appending
    checkBox.className = 'checkbox';
    checkBox.type = 'checkbox';

    editInput.type = 'text';
    editInput.className = 'input-invisible input-task-type-text task';

    editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
    editButton.className = 'button button-edit';

    deleteButton.className = 'button button-delete';
 
    deleteButtonImg.className = 'delete-img';
    deleteButtonImg.src = './remove.svg';

    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



const addTask=function(){
    console.log('Add Task...');
    //Create a new list item with the text from the #add-task:
    if (!taskInput.value) return;
    let listItem = createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = '';

}

//Edit an existing task.

const editTask=function(){
    console.log('Edit Task...');
    console.log('Change "edit" to "save"');
 

    let listItem=this.parentNode;

    let editInput = listItem.querySelector('.input-task-type-text');
    let label = listItem.querySelector('.label-task');
    let editBtn = listItem.querySelector('.button-edit');
    let input = listItem.querySelector('.input-task-type-text');

    let containsClass = listItem.classList.contains('edit-list');
   

    //If class of the parent is .edit-list
    if(containsClass){
        //switch to .edit-list
        //label becomes the inputs value.
        label.innerText = editInput.value;
        editBtn.innerText = 'Edit';
    }else{
        editInput.value = label.innerText;
        editBtn.innerText = 'Save';
    }

    //toggle .edit-list on the parent.
    listItem.classList.toggle('edit-list');
    label.classList.toggle('edit-list-label');
    input.classList.toggle('edit-list-input');
    
};


//Delete task.
const deleteTask=function(){
    console.log('Delete Task...');

    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
const taskCompleted=function(){
    console.log('Complete Task...');

    //Append the task list item to the #completed-tasks
    let listItem = this.parentNode;
    
    let label = listItem.querySelector('.label-task');

    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

    label.classList.toggle('cross');

}


const taskIncomplete=function(){
    console.log('Incomplete Task...');
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #todo-tasks.
    let listItem = this.parentNode;
    let label = listItem.querySelector('.label-task');
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    label.classList.toggle('cross');
}



const ajaxRequest=function(){
    console.log('AJAX Request');
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);


const bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log('bind list item events');
//select ListItems children
    let checkBox = taskListItem.querySelector('.checkbox');
    let editButton = taskListItem.querySelector('.button-edit');
    let deleteButton = taskListItem.querySelector('.button-delete');


    //Bind editTask to edit button.
    editButton.onclick = editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick = deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.