import globals from "./globals";
import { peformTwitterBot } from "./twitterBot";


function triggerTimer() {

    if (globals.timmerRunning) {
        return;
    } 

    console.log("Started");
    globals.timmerRunning = true;
    setInterval(async () => {
        peformTwitterBot();
    }, 78000);

    return;
}

export default triggerTimer;

