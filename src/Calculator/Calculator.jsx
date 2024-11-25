import React, { useState } from 'react';
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
const Calculator = () => {
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
            try {
                const result = eval(display.replace("÷", "/").replace("x", "*"));
                setDisplay(result.toString());
            } catch (err) {
                setDisplay("Error");
                setError(true);
            }
        } else if (value === "C") {
            setDisplay("0");
        } else if (value === "DEL") {
            setDisplay(display.slice(0, -1) || "0");
        } else if (value === "π") {
            setDisplay(Math.PI.toString());
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

                {/* Special Buttons */}
                <Button value="DEL" onClick={handleClick} customClass="del-btn" />
                <Button value="C" onClick={handleClick} customClass="clear-btn" />
            </div>
        </div>
    );
};

export default Calculator;
