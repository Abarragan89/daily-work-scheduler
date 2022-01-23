"use strict";

$(document).ready(function () {
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
    setInterval(getDate, (1000 * 60) * 30);

    // determine textarea background color
    const addBgColor = function () {
        let today = new Date();
        let hour = today.getHours();
        console.log("hour " + hour)
        // Get an array of each timeblock 
        const timeBlocks = $(".container-fluid").children();
        for (let i = 0; i < timeBlocks.length; i++) {
            let pEl = $(timeBlocks[i]).find("p").text();
            pEl = parseInt(pEl);
            // add 12 hours if less than 6 to keep 24 hour or comparison with javascript date object. 
            if (pEl < 6) {
                pEl += 12;
            }
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
    // Save to local storage
    const saveTasks = function () {
        const task = $(this).parent("div").siblings("div").find("textarea").val();
        const taskHour = $(this).parent("div").siblings("div").find("p").text();
        localStorage.setItem(taskHour, task)
            console.log(task)
            console.log(taskHour)
    }
    $(".row").on("click", "button", saveTasks);
    // Load tasks from local storage
    const load = function () {
        // load the AM tasks
        for (let i = 9; i < 13; i++)
        if (localStorage.getItem(i + "am")) {
            let task = localStorage.getItem(i + "am")
            console.log(task)
            $(`p:contains(${i + 'am'})`).parent("div").siblings("div").find("textarea").val(task)
        }
        // load the PM tasks
        for (let i = 1; i < 6; i++)
        if (localStorage.getItem(i + "pm")) {
            let task = localStorage.getItem(i + "pm")
            console.log(task)
            $(`p:contains(${i + 'pm'})`).parent("div").siblings("div").find("textarea").val(task)
        }
}
load();
addBgColor();
})