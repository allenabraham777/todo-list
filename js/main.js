$(document).ready(function(e){
  //AddTask Event
  $('#add-task-form').on('submit',function(){
    addTask(e);
  });

  //Edit Forms
  $('#edit-task-form').on('submit',function(){
    updateTask(e);
  });

  //Remove Task Event
  $('#task-table').on('click','#remove-task',function(){
    id = $(this).data('id');
    removeTask(id);
  });

  // Clear all tasks
  $('#clear-tasks').on('click',function(){
    clearAllTasks();
  });

  displayTasks();

  // Function to display tasks
  function displayTasks(){
    var taskList = JSON.parse(localStorage.getItem("tasks"));
    
    //Sort Tasks
    if(taskList != null){
      taskList = taskList.sort(sortByTime);
    }

    //Set counter
    var i = 0;
    // Check Tasks
    if(taskList != null){
      // Loop through and display
      $.each(taskList,function(key,value){
        $('#task-table').append('<tr id="'+value.id+'">'+
                                '<td>'+value.task+'</td>'+
                                '<td>'+value.taskPriority+'</td>'+
                                '<td>'+value.taskDate+'</td>'+
                                '<td>'+value.taskTime+'</td>'+
                                '<td><a href="edit.html?id='+value.id+'">Edit</a> | <a href="#" id="remove-task" data-id="'+value.id+'">Remove</a></td>'+
                                +'</tr>');
      });
    }
  }

  // Function to sort task
  function sortByTime (a, b) {
    var aTime = a.taskTime;
    var bTime = b.taskTime;

    var i = ((aTime < bTime) ? -1 : ((aTime > bTime) ? 1 : 0));
    return i;
  }

  // Function to add a task
  function addTask (e) {
    // Add a unique id
    var newDate = new Date();
    var id = newDate.getTime();
  
    var task = $('#task').val();
    var taskPriority = $('#priority').val(); 
    var taskDate = $('#date').val(); 
    var taskTime = $('#time').val(); 
  
    //Simple Validation
  
    if(task == ''){
      alert("Task is Required");
      e.preventDefault();
    }else if(taskDate == ''){
      alert("Date is Required");
      e.preventDefault();
    }else if(taskTime == ''){
      alert("Time is Required");
      e.preventDefault();
    }else if(taskPriority == ''){
      taskPriority = 'normal';
    }else{
      var tasks = JSON.parse(localStorage.getItem("tasks"));
  
      if (tasks == null) {
        tasks = [];
      }
    
      var newTask = {
        "id" : id,
        "task" : task,
        "taskPriority" : taskPriority,
        "taskDate" : taskDate,
        "taskTime" : taskTime
      };
  
      tasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(tasks));
  
      console.log("Task Added");
    }
  }

  // Function to Update a task
  function updateTask(e){
    var id = $('#task-id').val();
    var task = $('#task').val();
    var taskPriority = $('#priority').val(); 
    var taskDate = $('#date').val(); 
    var taskTime = $('#time').val();

    var tasks = JSON.parse(localStorage.getItem("tasks"));

    if(task == ''){
      alert("Task is Required");
      e.preventDefault();
    }else if(taskDate == ''){
      alert("Date is Required");
      e.preventDefault();
    }else if(taskTime == ''){
      alert("Time is Required");
      e.preventDefault();
    }else if(taskPriority == ''){
      taskPriority = 'normal';
    }else{      
      
      if (tasks == null) {
        tasks = [];
      }

      for (var i=0; i < tasks.length; i++) {
        if(tasks[i].id == id){
          tasks.splice(i,1);
        }
      }
      localStorage.setItem("tasks",JSON.stringify(tasks));
      
      var newTask = {
        "id" : id,
        "task" : task,
        "taskPriority" : taskPriority,
        "taskDate" : taskDate,
        "taskTime" : taskTime
      };
  
      tasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(tasks));
  
      console.log("Task Added");
    }
  }

  // Function to remove a task
  function removeTask(id){
    if(confirm("Are you sure do you want to delete")){
      var tasks = JSON.parse(localStorage.getItem("tasks"));
        
      for (var i=0; i < tasks.length; i++) {
        if(tasks[i].id == id){
          tasks.splice(i,1);
        }
      }
      localStorage.setItem("tasks",JSON.stringify(tasks));

      location.reload();
    }
    
  }

  // Function to clear all tasks
  function clearAllTasks(){
    if(confirm("Are you sure do you want to clear all task")){
      localStorage.setItem("tasks",null);

      location.reload();
    }
  }

});


//Function for getting a single task
function getTask(){
  var $_GET = getQueryParams(document.location.search);
  id = $_GET['id'];

  var taskList = JSON.parse(localStorage.getItem("tasks"));
  
  for(var i=0; i < taskList.length; i++){
    if(taskList[i].id == id) {
      $('#edit-task-form #task-id').val(taskList[i].id);
      $('#edit-task-form #task').val(taskList[i].task);
      $('#edit-task-form #priority').val(taskList[i].taskPriority);
      $('#edit-task-form #date').val(taskList[i].taskDate);
      $('#edit-task-form #time').val(taskList[i].taskTime);
    }
  }
}

function getQueryParams(qs) {
  qs = qs.split("+").join(" ");
  var params = {},
      tokens,
      re = /[?&]?([^=]+)=([^&]*)/g;
  
  while (tokens = re.exec(qs)) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }

  return params;
}