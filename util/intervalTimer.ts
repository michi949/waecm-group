import globals from "./globals";
import { peformTwitterBot } from "./twitterBot";


function triggerTimer() {

    if (globals.timmerRunning) {
        console.log("Timer allready started");
        return;
    } 

    globals.timmerRunning = true;
    console.log("Timer Started");
    setInterval(async () => {
        peformTwitterBot();
    }, 78000);

    return;
}

export default triggerTimer;

