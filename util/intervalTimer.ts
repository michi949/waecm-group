import globals from "./globals";
import { performTwitterBot } from "./twitterBot";


function triggerTimer() {

    if (globals.timmerRunning) {
        return;
    } 

    console.log("Started");
    globals.timmerRunning = true;
    setInterval(async () => {
        performTwitterBot();
    }, 78000);

    return;
}

export default triggerTimer;

