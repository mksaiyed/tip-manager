import React, { useState, useEffect } from "react";
import axios from "axios";
import { CONSTANTS } from "../utils/constants";

const TipRecords = ({ token }) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [records, setRecords] = useState([]);
    const [message, setMessage] = useState("");

    const handleGetRecords = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(
                `${CONSTANTS.apiUrl}/tip?startDate=${startDate}&endDate=${endDate}`,
                { headers: { Authorization: token } }
            );
            setRecords(response.data);
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div>
            <h2>Tip Records</h2>
            <form onSubmit={handleGetRecords}>
                <div>
                    <label>Start Date:</label>
                    <input
                        type="text"
                        placeholder="dd-mm-yyyy"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>End Date:</label>
                    <input
                        type="text"
                        placeholder="dd-mm-yyyy"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Get Records</button>
            </form>
            {records.length > 0 && (
                <ul>
                    {records.map((record, index) => (
                        <li key={index}>
                            Place: {record.place}, Total Amount:{" "}
                            {record.totalAmount}, Tip Amount: {record.tipAmount}
                        </li>
                    ))}
                </ul>
            )}
            <p>{message}</p>
        </div>
    );
};

export default TipRecords;
