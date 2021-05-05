let interval;

function triggerTimer() {

    if (interval) {
        console.log("Timer allready started");
        return;
    } 

    interval = setInterval(async () => {
       
    }, 60000);

    return;
}

export default triggerTimer;

