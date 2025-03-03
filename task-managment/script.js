document.getElementById("add").addEventListener('click', () => {
    document.getElementById("add-task-box").style.display = "block"
})
document.getElementById("add-close").addEventListener('click', () => {
    document.getElementById("add-task-box").style.display = "none"
})

let title = document.getElementById("title")
let des = document.getElementById("des")
let due = document.getElementById("due")
let pri = document.getElementById("pri")
// Add
document.getElementById("add-task-form").addEventListener('submit', (e) => {
    e.preventDefault()
    if (title.value == "") {
        document.getElementById("title-err").style.display = "block"
    } else {
        document.getElementById("title-err").style.display = "none"
        if (des.value == "") {
            document.getElementById("des-err").style.display = "block"
        } else {
            document.getElementById("des-err").style.display = "none"
            if (due.value == "") {
                document.getElementById("due-err").style.display = "block"
            } else {
                document.getElementById("due-err").style.display = "none"
                let currentDate = (new Date()).toLocaleDateString('en-GB').split("/")
                let enteredDate = (due.value).split("-").reverse()
                if (enteredDate[2] >= currentDate[2]) {
                    document.getElementById("due-err2").style.display = "none"
                    if (enteredDate[1] >= currentDate[1]) {
                        document.getElementById("due-err2").style.display = "none"
                        if (enteredDate[1] == currentDate[1]) {
                            if (enteredDate[0] >= currentDate[0]) {
                                if (pri.value == "") {
                                    document.getElementById("pri-err").style.display = "block"
                                } else {
                                    document.getElementById("pri-err").style.display = "none"
                                    if (pri.value.toLowerCase() == 'high' || pri.value.toLowerCase() == 'low' || pri.value.toLowerCase() == 'medium') {
                                        document.getElementById("pri-err2").style.display = "none"
                                        let tasks = JSON.parse(localStorage.getItem("tasks")) || []
                                        if (tasks == "") {
                                            addTask(tasks);
                                        } else {
                                            checkExistance(tasks);
                                        }
                                    } else {
                                        document.getElementById("pri-err2").style.display = "block"
                                    }
                                }
                            } else {
                                document.getElementById("due-err2").style.display = "block"
                            }
                        } else {
                            if (pri == "") {
                                document.getElementById("pri-err").style.display = "block"
                            } else {
                                document.getElementById("pri-err").style.display = "none"
                                if (pri.value.toLowerCase() == 'high' || pri.value.toLowerCase() == 'low' || pri.value.toLowerCase() == 'medium') {
                                    document.getElementById("pri-err2").style.display = "none"
                                    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
                                    if (tasks == "") {
                                        addTask(tasks);
                                    } else {
                                        checkExistance(tasks);
                                    }
                                } else {
                                    document.getElementById("pri-err2").style.display = "block"
                                }
                            }
                        }
                    } else {
                        document.getElementById("due-err2").style.display = "block"
                    }
                } else {
                    document.getElementById("due-err2").style.display = "block"

                }
            }
        }
    }
})

function checkExistance(tasks) {
    let valid
    tasks.forEach((e) => {
        if (e.title == title.value) {
            valid = 0
        } else {
            valid = 1;
        }
    })
    if (valid == 1)
        addTask(tasks);
    else
        alert("task Exist")
}

function addTask(tasks) {
    let num = tasks.length
    let obj = {
        title: `${title.value}`,
        des: `${des.value}`,
        due: `${due.value}`,
        pri: `${pri.value.toLowerCase()}`,
        num: `${num + 1}`
    }
    tasks.push(obj)
    localStorage.setItem("tasks", JSON.stringify(tasks))
    title.value = ""
    des.value = ""
    due.value = ""
    pri.value = ""
    document.getElementById("display").innerHTML = display();
}

document.getElementById("display").innerHTML = display();
function display() {
    let tasks = JSON.parse(localStorage.getItem("tasks"))
    return tasks.map((e) => {
        return `<div class="dis-box">
                    <h2 id="task-no">${e.num}</h2>
                    <h3>${e.title}</h3>
                    <p>${e.des}</p>
                    <p>${e.due}</p>
                    <p>${e.pri}</p>
                    <button class="del-btn" value="${e.title}"> X </button>
                    <button class="edit-btn" value="${e.title}"> 🖉 </button>
                </div>`
    }).join('')
}

// Delete
let d = 0
document.getElementById("remove").addEventListener('click', () => {
    if (d == 0) {
        d = 1
        document.querySelectorAll(".del-btn").forEach((e) => {
            e.style.display = "block"
        })
        document.querySelectorAll(".del-btn").forEach((e) => {
            e.addEventListener('click', () => {
                del(e.value)
            })
        })
    } else {
        d = 0
        document.querySelectorAll(".del-btn").forEach((e) => {
            e.style.display = "none"
        })
    }
})

function del(delTaskTitle) {
    let tasks = JSON.parse(localStorage.getItem("tasks"))
    let newTasks = tasks.filter((e) => {
        return e.title != delTaskTitle
    })
    localStorage.setItem("tasks", "")
    let a = 0
    newTasks.forEach((e) => {
        e.num = a + 1
        a++
    })
    localStorage.setItem("tasks", JSON.stringify(newTasks))
    document.getElementById("display").innerHTML = display();
}

// Edit
let e = 0
document.getElementById("edit").addEventListener('click', () => {
    if (e == 0) {
        e = 1
        document.querySelectorAll(".edit-btn").forEach((e) => {
            e.style.display = "block"
        })
        document.querySelectorAll(".edit-btn").forEach((e) => {
            e.addEventListener('click', () => {
                edit(e.value);
            })
        })
    } else {
        e = 0
        document.querySelectorAll(".edit-btn").forEach((e) => {
            e.style.display = "none"
        })
    }
})

function edit(editTaskTitle) {
    let tasks = JSON.parse(localStorage.getItem("tasks"))
    document.getElementById("add-task-box").style.display = "block"
    tasks.forEach((e) => {
        if (e.title == editTaskTitle) {
            title.value = `${e.title}`
            des.value = `${e.des}`
            due.value = `${e.due}`
            pri.value = `${e.pri}`
        }
    })
    del(editTaskTitle)
}