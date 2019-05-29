// Code goes here

//create the object todo list
var todoList = {
  todos: [], //the array that will store all the todos

  //display todos property is a  method... showing it all in console
  displayTodos: function() {
    //check how many todos in the array
    //debugger;
    if (this.todos.length === 0) {
      console.log('Your Todo list is empty!');
    } else {
      //if there are some items stored then show them with the for loop...
      console.log('My todo list:-');
      for (var i = 0; i < this.todos.length; i++) {
        //console.log(this.todos[i].todoText);

        //check if .completed is true
        if (this.todos[i].completed === true) {
          //print with (x)
          console.log('(x)', this.todos[i].todoText); //property found in addTodo
        } else {
          //print with ()
          console.log('()', this.todos[i].todoText);
        }
      }
    }
  },

  addTodo: function(todoText) {
    //debugger;
    this.todos.push({
      todoText: todoText,
      completed: false
    });
    //this.displayTodos();-> now using the view object in each handler
  },

  changeTodo: function(position, todoText) {
    //this.todos[position] = newValue;
    /*the first todoText is the property in addTodo. 
    the second todoText is the value passed into the functions parameter.*/
    this.todos[position].todoText = todoText;

    //this.displayTodos();-> now using the view object in each handler
  },

  deleteTodo: function(position) {
    this.todos.splice(position, 1);
    //this.displayTodos();-> now using the view object in each handler
  },

  /* Object called toggleCompleted. It will have an argument passed in instead of position so that it
  knows which todo in the todos array to toggle completed or not.
  Has a new var to store its data called todo. This var takes the postion of the todo.
  Then we want to grab the todo with the property of completed (found in the addTodo object method) and set it to the opposite of what it is showing using the '!'.
  Using the new var todo saves us from having to write 'this.todos[position]' twice eg = in the next line
  this.todos[position].completed = !this.todos[position].completed etc....*/

  toggleCompleted: function(position) {
    
    var todo = this.todos[position];
    todo.completed = !todo.completed;
    //this.displayTodos();-> now using the view object in each handler
  },

  toggleAll: function() {
    var totalTodos = this.todos.length; //create the var,get all the todos in the todos array.
    var completedTodos = 0; // create the new var and presome that none are completed.

    //get number of completed todos...
    /*for (i = 0; i < totalTodos; i++) {
      if (this.todos[i].completed === true) {
        completedTodos++;
      }
    }*/
    /*replace the code above with the foreach method. use an anon callback function with todo var
    passed in ,which gets data from todosList.todos array...*/
    this.todos.forEach(function(todo){
      if(todo.completed === true) {
        completedTodos++;
      }
    });

    //1. if everything is true, make everything false..
   // if (completedTodos === totalTodos) {
   //   //make everything false
   //   /*for (var i = 0; i < totalTodos; i++) {
   //     this.todos[i].completed = false;*/
   //     /*use forEach function instead of above*/
   //     this.todos.forEach(function(todo){
   //       todo.completed = false;
   //     });
      
   //   //2. otherwise, make everything true...
   // } else {
   //   /*for (var i = 0; i < totalTodos; i++) {
   //     this.todos[i].completed = true;
   //   }*/
   //   this.todos.forEach(function(todo){
   //       todo.completed = true;
   //    });
   
    this.todos.forEach(function(todo){
      //1. if everything id true make evrything false
      if (completedTodos === totalTodos){
        todo.completed = false;
        //2. otherwise make everything true
      }else{
        todo.completed = true;
      }
    });
      
    
    //this.displayTodos(); -> now using the view object in each handler
  }
};

//1. get access to the display todos button & toggle all button...
var displayTodosButton = document.getElementById('displayTodosBtn');
//console.log(displayTodosBtn);
var toggleAllButton  = document.getElementById('toggleAllBtn'); 

//2.run the displayTodos method, when someone clicks the displayTodosButton(id of displayTodosBtn)...
displayTodosButton.addEventListener('click', function(){
  todoList.displayTodos();//grab the todos list array and use the displayTodos method upon it...
});

//3 run the toggleall method when a user clicks the  togglw all btton on the html...
toggleAllButton.addEventListener('click', function(){
  todoList.toggleAll();//grab the todos list array and use the toggleAll method upon it...
});


//Alternative way to intercat with the buttons vis javascript...REFACTURING...
let handlers = {
  displayTodos: function(){
    todoList.displayTodos() // grab the todos list array and dispaly it using the displayTodos method...
  },
  
  addTodo: function(){
    /* grabs the value stored in the input box with the id of 'addTodoTextInput'.
    which is now stored in the let of 'addTodoText...'
    this is put as the argument into the 'addTodo' method property built in the todoList object*/
    let addTodoText = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoText.value);
    addTodoText.value = '';//this will now clear the input box after the input has been addedd...
    view.displayTodos();
  },
  
  changeTodo: function(){
    let changeTodoPosInp = document.getElementById('changeTodoPositionInput');
    let changeTodoTextInp = document.getElementById('changeTodoTextInput');
    /*the todoList object usues its ChangeTodo method that takes in two arguments.
    the first argument = 'position' which is grabbed from the input and stored in let 'changeTodoPosInp'.
    The position willbe a number and to make sure it reads ut as anumber we use the built
    in js method 'valueAsNumber...
    the second argument comes from the second input stored in let 'changeTodoTextInp'. This will be the
    'todoText' parameter. found in the todos array.... ok to be a string so use its value...
    */
    todoList.changeTodo(changeTodoPosInp.valueAsNumber, changeTodoTextInp.value);
    changeTodoPosInp.value = '';
    changeTodoTextInp.value = '';
    view.displayTodos();
  },
  
  deleteTodo: function(){
    let deleteTodoPosInp = document.getElementById('deleteTodoPositionInput');
    todoList.deleteTodo(deleteTodoPosInp.valueAsNumber);
    deleteTodoPosInp.value = '';
    view.displayTodos();
  },
  //for the delete button found in the list
  deleteTodoLi: function(position){
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  
  toggleCompleted: function(){
    let toggleCompletedInp = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedInp.valueAsNumber);
    toggleCompletedInp.value = '';
    view.displayTodos();
  },
  
  toggleAll: function(){
     todoList.toggleAll();//grab the todos list array and use the toggleAll method upon it...
     view.displayTodos();
  }
};

/*  view object - renders the data to the screen for users to see the todos in a list*/
let view = {
  displayTodos: function(){
    let todosUl = document.querySelector('ul');//create an UL each time click to view
    todosUl.innerHTML = '';// makes the list empty, clears it out each time before it is shown again...
    //  for (var i =0; i < todoList.todos.length; i++){//loops throught he todos array
    //    let todoLi = document.createElement('li');
    //   let todo = todoList.todos[i];//saves retyping  new variable to hold the text in the todos array via i loop...
    //   let todoTextWithCompletion = '';
    //    
    //    if ( todo.completed === true){
    //      todoTextWithCompletion = '(x) ' + todo.todoText;
    //    }else{
    //      todoTextWithCompletion = '() ' + todo.todoText;
    //    }
    
    //    todoLi.id = i;//gives each item its unique id from the array -in the displayTodos for loop , i will accept the arrays index number for each item
    //    todoLi.textContent = todoTextWithCompletion;// will show the outcome of above if condition...
    //    todoLi.appendChild(this.createDeleteButton())// THIS. REFERS TO THE VIEW OBJECT and adds a delete button to the view within the list element
    //    todosUl.appendChild(todoLi);// adds items in the list to the ul on view...
        //todoLi.textContent = todoList.todos[i].todoText; // will show the text of each item held in the array, using i from each loop...
        
      
      /*use foreach instead of above commented out code...*/
      todoList.todos.forEach(function(todo, position){
     
        let todoLi = document.createElement('li');
        let todoTextWithCompletion = '';
        
        if ( todo.completed === true){
          todoTextWithCompletion = '(x) ' + todo.todoText;
        }else{
          todoTextWithCompletion = '() ' + todo.todoText;
        }
    
        todoLi.id = position;//gives each item its unique id from the array -in the displayTodos for loop , i will accept the arrays index number for each item
        todoLi.textContent = todoTextWithCompletion;// wiil show the outcome of above if condition...
        todoLi.appendChild(this.createDeleteButton())// adds a delete button to the view within the list element
        todosUl.appendChild(todoLi);// adds items in the list to the ul on view...
        
        //todoLi.textContent = todoList.todos[i].todoText; // will show the text of each item held in the array, using i from each loop...
        
    },this);//because we are usinga callback function the this keyword needs to be added here
           //so that it refers the orginal object of view.
  },
  
  createDeleteButton: function(){
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'delete';
    deleteBtn.className = 'deleteButton';
    return deleteBtn;
  },
  
  setUpEventListeners(){
        /*listens to an event upon the UL element*/
    let todosUL = document.querySelector('ul');
    todosUL.addEventListener('click', function(event) {
      //console.log(event.target.parentNode.id);
      
      //get the element that was clicked on
    let elementClicked = event.target;
    
    //check if element clicked is the delete button
    if (elementClicked.className === 'deleteButton'){
      //as the element is a string, use parseInt to turn it into a number
      handlers.deleteTodoLi(parseInt(elementClicked.parentNode.id));
    }
    });
  }
};

view.setUpEventListeners();//call this function



/* a debugger to run functions in...*/
function runWithDebugger(ourFunction){
  //code to execute....
  debugger;
  ourFunction();
}

/* use setTimeout to build a simple alarm clock...*/
setTimeout(function(){
  console.log('Wake up Kyle!!!!');
  
}, 5000)