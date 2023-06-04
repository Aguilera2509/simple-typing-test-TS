import { NextPage } from "next";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const SpanWordsTyping:NextPage<{dataText:string[], words:string, dataUserSpan:string, setDataUserSpan:Dispatch<SetStateAction<string>>, time:number}> = ({ dataText, words, dataUserSpan, setDataUserSpan, time }) =>{
  const [rowToShow, setRowToShow] = useState<number>(0);
  
  useEffect(()=> {
    document.addEventListener("contextmenu", (e:MouseEvent) => {
      e.preventDefault();
    });
    
    if(rowToShow === 0){
      setDataUserSpan(dataText[rowToShow]);
    }else{
      setDataUserSpan(dataUserSpan + "." + dataText[rowToShow])
    };

    const interval:NodeJS.Timer = setInterval(()=> {
      if(rowToShow < dataText.length && time !== 0){
        setRowToShow(rowToShow + 1);
      };
    }, 15000);
  return () => clearInterval(interval);
  }, [rowToShow]);

  return(
    <div className="text-bg-primary p-3 m-2" style={{"borderRadius": "2%"}}>
      {dataUserSpan.replace(/\n/g," ").split("").map((el, index) => {
        let BgColor:string = "";

        if(index < words.length){
          BgColor = el === words[index] ? "green" : el !== words[index] ? "red" : "transparent";
        };

        return <span key={index} style={{"backgroundColor": BgColor}}>{el}</span>
      })}
    </div>
  );
};