import { NextPage } from "next";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SpanWordsTyping } from "./spanwords";
import { Result, Selected } from "./types";
import { Timer } from "./timer";

export const Test:NextPage<{dataText:string[], selectedOptions:Selected, setResult:Dispatch<SetStateAction<Result>>, setDataText:Dispatch<SetStateAction<string[]>>}> = ({ dataText, selectedOptions, setResult , setDataText }) =>{
    const [words, setWords] = useState<string>("");
    const [time, setTime] = useState<number>( selectedOptions.time === "1" ? 60 : 
    selectedOptions.time === "2" ? 120 : 
    selectedOptions.time === "5" ? 300 : 600 );
    const [dataUserSpan, setDataUserSpan] = useState<string>("");

    useEffect(()=> {
        const interval:NodeJS.Timer = setInterval(()=> {
            if(time > 0){
                setTime(time - 1);
            };
        }, 1000);

        if(time === 0){
            let numberSuccess:number = 0;
            let numberErrors:number = 0;
            for (let index:number = 0; index < words.length; index++) {
                if(dataUserSpan[index] === words[index]){
                    numberSuccess += 1;
                }else{
                    numberErrors += 1;
                };
                setResult({success: numberSuccess, errs: numberErrors});
                setDataText([]);
            };
        };

        return () => clearInterval(interval);
    },[time]);

    return(
        <div className="card text-bg-success" style={{"width": "60%"}}>
            <div className="card-body">
                <div className="mb-3">
                    <Timer time={time} selectedOptions={selectedOptions} />
                    <SpanWordsTyping dataText={dataText} words={words} dataUserSpan={dataUserSpan} setDataUserSpan={setDataUserSpan} time={time} />
                </div>
                <div className="mb-3">
                    <textarea value={words} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>)=> setWords(e.target.value)} readOnly={time == 0}  placeholder="Write paraghaphs here as fast as you can" className="form-control" id="exampleFormControlTextarea1" rows={3}></textarea>
                </div>
            </div>
        </div>
    );
};