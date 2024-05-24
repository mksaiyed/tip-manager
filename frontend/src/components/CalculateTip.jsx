import React, { useState } from "react";
import axios from "axios";
import { CONSTANTS } from "../utils/constants";

const CalculateTip = ({ token }) => {
    const [place, setPlace] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [tipPercentage, setTipPercentage] = useState("");
    const [tip, setTip] = useState(null);
    const [message, setMessage] = useState("");

    const handleCalculateTip = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${CONSTANTS.apiUrl}/tip/calculate`,
                { place, totalAmount, tipPercentage },
                { headers: { Authorization: token } }
            );
            setTip(response.data.tip);
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div>
            <h2>Calculate Tip</h2>
            <form onSubmit={handleCalculateTip}>
                <div>
                    <label>Place:</label>
                    <input
                        type="text"
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Total Amount:</label>
                    <input
                        type="number"
                        value={totalAmount}
                        onChange={(e) => setTotalAmount(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Tip Percentage:</label>
                    <input
                        type="number"
                        value={tipPercentage}
                        onChange={(e) => setTipPercentage(e.target.value)}
                        max={99}
                        min={1}
                        required
                    />
                </div>
                <button type="submit">Calculate</button>
            </form>
            {tip && <p>Tip Amount: {tip}</p>}
            <p>{message}</p>
        </div>
    );
};

export default CalculateTip;
