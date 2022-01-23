"use strict";

$(document).ready(function () {
    // Check local storage
    let savedTasks = JSON.parse(localStorage.getItem("personalTasks"));
    console.log(savedTasks)
    if (!savedTasks) {
        savedTasks = []
    }
    // Get the hours in the p tags into an array
    const paraEls = $(".row p");
    // an arrray of the hours
    let hours = paraEls.text();
    hours = hours.split("m");
    console.log(hours)

    // add current date in header
    const getDate = function () {
        const options = {
            weekday: "long",
            month: "long",
            day: "numeric"
        }
        const today = new Date();
        const formatDate = today.toLocaleDateString("en-US", options)
        $("#currentDay").text(formatDate)
    }
    getDate();
    setInterval(getDate, (1000 * 60) * 30)

    // determine textarea background color
    const addBgColor = function () {
        let today = new Date();
        let hour = today.getHours();
        console.log("hour " + hour)

        const timeBlocks = $(".container-fluid").children();
        for (let i = 0; i < timeBlocks.length; i++) {
            let pEl = $(timeBlocks[i]).find("p").text();
            pEl = parseInt(pEl);
            // add 12 hours if less than 6 to keep 24 hour. 
            if (pEl < 6) {
                pEl += 12;
            }
            console.log(pEl)
            // compare hour with current hour and change styles
            if (pEl < hour) {
                $(timeBlocks[i]).find("textarea")
                    .addClass("past");
            } else if (pEl > hour) {
                $(timeBlocks[i]).find("textarea")
                    .addClass("future");
            } else if (pEl == hour) {
                $(timeBlocks[i]).find("textarea")
                    .addClass("present");
            }
        }
    }
    // addBgColor();

    // Save to local storage
    // event.target is what triggered it, 'this' is what the eventListener is attached to. This is the second parameter in the 'on' method. 

    const saveTasks = function (event) {
        const task = $(this).parent("div").siblings("div").find("textarea").val();
        const taskHour = $(this).parent("div").siblings("div").find("p").text();
        // debugger;
        if (savedTasks.length == 0) {
            savedTasks.push({ hour: taskHour, task: task });
            // } else if () {

            // see if taskHour is equal to one of 

        } else if (savedTasks.length > 0) {
            for (let i = 0; i < savedTasks.length; i++) {
                if (savedTasks[i].hour == taskHour) {
                    savedTasks[i].task = task;
                    break;
                } 
            }
            for (let i = 0; i < hours.length; i++) {
                if (savedTasks[i].hour !== taskHour) {
                    savedTasks.push({ hour: taskHour, task: task });
                }
            }

            
            console.log(savedTasks)
            console.log(task)
            console.log(taskHour)
            localStorage.setItem("personalTasks", JSON.stringify(savedTasks))
        }
    }
    $(".row").on("click", "button", saveTasks);

    // Load tasks from local storage
    // const load = function () {
    //     for (let i = 0; i < savedTasks.length; i++) {
    //         for (let j = 0; j < hours.length; i++) {
    //             if (savedTasks[i].hour == hours[j]) {
    //                 $(paraEls[j]).parent().siblings("div").find("textarea").val(savedTasks[i].task)
    //             }
    //         }
    //     }

    // }
    // load();



    ///////////////////////////     HELPER FUNCTIONS    /////////////////////////////
})