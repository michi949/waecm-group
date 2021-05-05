import { peformTwitterBot } from "./twitterBot";

let interval;

function triggerTimer() {

    if (interval) {
        console.log("Timer allready started");
        return;
    } 

    interval = setInterval(async () => {
        peformTwitterBot();
    }, 120000);

    return;
}

export default triggerTimer;

