import React from 'react';
import "./history.css";


const HistoryPrompt = () => {

    const current = new Date();
    const date = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;

    // will need to change this history of prompts based off user
    const HistoryOfPrompts1 = "Would you like to be famous? In what way?";
    const HistoryOfPrompts2 = "Given the choice of anyone in the world, whom would you want as a dinner guest? Draw them";
    const HistoryOfPrompts3 = "Tell me about what you wanted to be when you were a child?";

    // function that submits the user response
    function submitResponse() {
        // code here
    }
    
    return (
        <div>
            <h1>History</h1>
            <p>{date}</p>
            <div>
            
                <ul class="list-group container-fluid">
                    <li class="list-group-item">{HistoryOfPrompts1}</li>
                    <textarea class="form-control list-group-item" id="exampleFormControlTextarea1" rows="3"></textarea>
                </ul>
                <p className="history-date">{date}</p>
                <ul class="list-group container-fluid">
                    <li class="list-group-item">{HistoryOfPrompts2}</li>
                    <textarea class="form-control list-group-item" id="exampleFormControlTextarea1" rows="3"></textarea>
                </ul>
                <p className="history-date">{date}</p>
                <ul class="list-group container-fluid">
                    <li class="list-group-item">{HistoryOfPrompts3}</li>
                    <textarea class="form-control list-group-item" id="exampleFormControlTextarea1" rows="3"></textarea>
                </ul>
                <p className="history-date">{date}</p>
            </div>
        </div>
    );
}


export default HistoryPrompt;