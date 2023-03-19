const addForm = document.querySelector(".add");
const addTasks = document.querySelector(".tasks");
const clearAll = document.querySelector(".clear");
const messageSpan = document.querySelector(".message-box span");
const searchForm = document.querySelector(".search");

function messageupdate(){
    const textLength = addTasks.children.length;
   messageSpan.textContent = `You have ${textLength} pending tasks!`;
}
messageupdate();




addForm.addEventListener("submit",event =>{
    event.preventDefault();
    value = addForm.task.value.trim() //trim used to remove white space
    if(value.length){
        addTasks.innerHTML += `<li>
                                <span>${value}</span>
                                <i class="bi bi-trash-fill delete"></i>
                               </li>`
        addForm.reset();
        messageupdate();
    }
});

addTasks.addEventListener("click",event =>{
    if(event.target.classList.contains("delete")){
        event.target.parentElement.remove();
        messageupdate();
       //target will show were we are clicking
    }
    
});

clearAll.addEventListener("click",event =>{
         const allTasks = addTasks.querySelectorAll("li");
         allTasks.forEach(item =>{
            item.remove();
         });
        messageupdate();
});

function filterTask(term){
    Array.from(addTasks.children).filter(task =>{
           return !task.textContent.toLowerCase().includes(term);
    }).forEach((task)=>{
        task.classList.add("hide");
    }); //convert from htmlcollection to array

    Array.from(addTasks.children).filter(task =>{
        return task.textContent.toLowerCase().includes(term);
    }).forEach((task)=>{
        task.classList.remove("hide");
    });
    
}

searchForm.addEventListener("keyup",event =>{
    const term = searchForm.task.value.trim().toLowerCase();
    filterTask(term);

});

searchForm.addEventListener("click",event =>{
   if(event.target.classList.contains("reset"))
   searchForm.reset();
   const term =searchForm.task.value.trim();
   filterTask(term);
});
