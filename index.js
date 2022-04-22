
function createEmployeeRecord(arr){
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(arr){
    return arr.map(i => createEmployeeRecord(i));
}

function createTimeInEvent(arr, time){
    let timeArr = time.split(" ");
    let timeIn = {
        type: 'TimeIn',
        date: timeArr[0],
        hour: parseInt(timeArr[1])
    }
    arr.timeInEvents.push(timeIn); 
    return arr;
}

function createTimeOutEvent(arr, time){
    let timeArr = time.split(' ');
    let timeOut = {
        type: 'TimeOut',
        date: timeArr[0],
        hour: parseInt(timeArr[1])
    }
    arr.timeOutEvents.push(timeOut);
    return arr;
}

function hoursWorkedOnDate(record, date){
    let timeIn = record.timeInEvents.find(el => el.date === date).hour.toString().slice(0, -2);
    let timeOut = record.timeOutEvents.find(el => el.date === date).hour.toString().slice(0, -2);

    return parseInt(timeOut - timeIn);
}

function wagesEarnedOnDate(record, date){
    return hoursWorkedOnDate(record, date) * record.payPerHour;
}

function allWagesFor(record){
    let hours = []
    record.timeInEvents.forEach(el => hours.push(wagesEarnedOnDate(record, el.date)));
    return hours.reduce((accum, el) => accum + el );
}

function calculatePayroll(arr){
    let payroll = []
    arr.forEach(el => payroll.push(allWagesFor(el)));
    return payroll.reduce((accum, el) => accum + el);
}

