import globals from "./globals";
import { performTwitterBot } from "./twitterBot";


function triggerTimer() {
    if (globals.timerRunning) {
        return;
    } 

    console.log("Started");
    globals.timerRunning = true;
    setInterval(() => performTwitterBot(), 60000);
}

export default triggerTimer;

