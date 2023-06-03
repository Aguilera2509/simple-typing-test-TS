import { NextPage } from "next";
import { Option, Result, Selected } from "./types";
import { Dispatch, SetStateAction } from "react";

const optionsMode:Option[] = [
  { value: 'easyMode.txt', label: 'Easy' },
  { value: 'normalMode.txt', label: 'Normal' },
  { value: 'difficultMode.txt', label: 'Difficult' }
];
const optionsTime:Option[] = [
  { value: '1', label: '1 minute' },
  { value: '2', label: '2 minutes' },
  { value: '5', label: '5 minutes' },
  { value: '10', label: '10 minutes' },
];

export const ModalInitTest:NextPage<{selectedOptions:Selected, setSelectedOptions:Dispatch<SetStateAction<Selected>>, setDataText:Dispatch<SetStateAction<string[]>>, result:Result}> = ({ selectedOptions, setSelectedOptions, setDataText, result }) => {
    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>):void => {
        setSelectedOptions({
          ...selectedOptions,
          [event.target.name]: event.target.value
        });
    };

    const handleButton = ():void =>{
        if(selectedOptions.mode === "") return;
        if(selectedOptions.time === "") return;
    
        fetch(selectedOptions.mode)
        .then(response => response.text())
        .then(data => {
          setDataText(data.split("."));
        });
    };
    
    return(
        <div className="card text-white bg-success mb-3">
            <div className="card-header">Welcome, Dear User</div>
            <div className="card-body">
            <h5 className="card-title">Choose which level you want to try and let&apos;s start</h5>
            <p className="card-text">This is a proof to practice your speed on a keyword, let&apos;s see how many letters you are able to write at certain time</p>
            <select className="form-select mb-2" name='mode' value={selectedOptions.mode} onChange={handleOptionChange} aria-label="Default select example">
                {optionsMode.map((option) => (
                <option value={option.value} key={option.value}>{option.label}</option>
                ))}
            </select>
            <select className="form-select mb-2" name='time' value={selectedOptions.time} onChange={handleOptionChange} aria-label="Default select example">
                {optionsTime.map((option) => (
                <option value={option.value} key={option.value}>{option.label}</option>
                ))}
            </select>
            <button type="button" onClick={handleButton} className="btn btn-info">Ready</button>

            {result.success + result.errs >= 0 &&
              <div className="card" style={{"width": "18rem"}}>
                <div className="card-header">
                  Congratulations. This are your results in {selectedOptions.mode === "easyMode.txt" ? "Mode: Easy" : selectedOptions.mode === "normalMode.txt" ? "Mode: Normal" : "Mode: Hard"}
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">You wrote correctly: {result.success} letters</li>
                  <li className="list-group-item">You had {result.errs} errors</li>
                  <li className="list-group-item">you wrote {result.success+result.errs} letters in {selectedOptions.time} minute/minutes</li>
                  <li className="list-group-item">Do you want to try it, again?</li>
                </ul>
              </div>
            }
            </div>
        </div>
    );
};