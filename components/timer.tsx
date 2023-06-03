import { NextPage } from "next";
import { Selected } from "./types";

function minutesFormatHuman(seconds:number):{minutes:number, remainingSeconds:number} {
    const minutes:number = Math.floor(seconds / 60);
    const remainingSeconds:number = seconds % 60;

    return {
        minutes,
        remainingSeconds
    };
};

export const Timer:NextPage<{time:number, selectedOptions:Selected}> = ({ time, selectedOptions }) => {
    const { minutes, remainingSeconds } = minutesFormatHuman(time);
    return(
        <div className="container text-center">
            <div className="row align-items-start">
                <div className="col">
                    {selectedOptions.mode === "easyMode.txt" ? "Mode: Easy" : selectedOptions.mode === "normalMode.txt" ? "Mode: Normal" : "Mode: Hard"}
                </div>
                <div className="col">
                    Time Remaining: {minutes}:{remainingSeconds < 10 ? "0" : ""}{remainingSeconds}
                </div>
            </div>
        </div>
    );
};