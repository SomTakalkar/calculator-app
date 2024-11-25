import React, { useState } from 'react';
import '../App.css';

// Button component for calculator buttons
const Button = ({ value, onClick, customClass }) => {
    return (
        <button
            className={`btn ${customClass}`}
            onClick={() => onClick(value)}
        >
            {value}
        </button>
    );
};

// Helper function to calculate the BODMAS expression
const calculateBodmas = (expression) => {
    try {
        // Use a regular expression to handle brackets and operators
        const result = new Function('return ' + expression.replace('÷', '/').replace('x', '*').replace('^', '**'))();
        return result;
    } catch (err) {
        return "Error";
    }
};

// Function to handle scientific operations
const handleScientificOperation = (value, currentDisplay) => {
    try {
        let result;
        if (value === "sin") {
            result = Math.sin(parseFloat(currentDisplay) * Math.PI / 180); // Convert to radians
        } else if (value === "cos") {
            result = Math.cos(parseFloat(currentDisplay) * Math.PI / 180);
        } else if (value === "tan") {
            result = Math.tan(parseFloat(currentDisplay) * Math.PI / 180);
        } else if (value === "sqrt") {
            result = Math.sqrt(parseFloat(currentDisplay));
        } else if (value === "log") {
            result = Math.log10(parseFloat(currentDisplay));
        } else if (value === "ln") {
            result = Math.log(parseFloat(currentDisplay));
        } else if (value === "π") {
            result = Math.PI;
        }
        return result;
    } catch {
        return "Error";
    }
};

const BodmasCalculator = () => {
    const [display, setDisplay] = useState("0");
    const [error, setError] = useState(false);

    // Handle button clicks
    const handleClick = (value) => {
        if (error) {
            setDisplay(value);
            setError(false);
            return;
        }

        if (value === "=") {
            const result = calculateBodmas(display);
            setDisplay(result.toString());
        } else if (value === "C") {
            setDisplay("0");
        } else if (value === "DEL") {
            setDisplay(display.slice(0, -1) || "0");
        } else if (["sin", "cos", "tan", "sqrt", "log", "ln", "π"].includes(value)) {
            const result = handleScientificOperation(value, display);
            setDisplay(result.toString());
        } else if (value === "(" || value === ")") {
            // Handle parentheses
            if (display === "0" || display === "Error") {
                setDisplay(value);
            } else {
                setDisplay(display + value);
            }
        } else {
            setDisplay(display === "0" ? value : display + value);
        }
    };

    return (
        <div className="calculator">
            <div className="screen">{display}</div>
            <div className="buttons">
                {/* Number and Operator Buttons */}
                {["7", "8", "9", "÷"].map((item) => (
                    <Button key={item} value={item} onClick={handleClick} />
                ))}
                {["4", "5", "6", "x"].map((item) => (
                    <Button key={item} value={item} onClick={handleClick} />
                ))}
                {["1", "2", "3", "-"].map((item) => (
                    <Button key={item} value={item} onClick={handleClick} />
                ))}
                {["0", ".", "=", "+"].map((item) => (
                    <Button key={item} value={item} onClick={handleClick} />
                ))}
                {["(", ")"].map((item) => (
                    <Button key={item} value={item} onClick={handleClick} />
                ))}
                {/* Scientific Mode Buttons */}
                {["sin", "cos", "tan", "sqrt", "log", "ln", "π"].map((item) => (
                    <Button key={item} value={item} onClick={handleClick} />
                ))}

                {/* Special Buttons */}
                <Button value="DEL" onClick={handleClick} customClass="del-btn" />
                <Button value="C" onClick={handleClick} customClass="clear-btn" />
            </div>
        </div>
    );
};

export default BodmasCalculator;
