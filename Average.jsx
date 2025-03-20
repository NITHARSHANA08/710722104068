import { useState } from "react";

const Average = () => {
  const [numbers, setNumbers] = useState("");
  const [average, setAverage] = useState(null);

  const calculateAverage = async () => {
    const numArray = numbers.split(",").map((num) => parseFloat(num.trim()));

    if (numArray.some(isNaN)) {
      setAverage("Invalid input. Please enter numbers separated by commas.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/calculate-average", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numbers: numArray }),
      });

      const data = await response.json();
      setAverage(data.average);
    } catch (error) {
      setAverage("Error fetching data.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Average Calculator</h2>
      <input
        type="text"
        placeholder="Enter numbers separated by commas"
        value={numbers}
        onChange={(e) => setNumbers(e.target.value)}
        style={styles.input}
      />
      <button onClick={calculateAverage} style={styles.button}>
        Calculate Average
      </button>
      {average !== null && <h3>Average: {average}</h3>}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "10px",
    background: "#f4f4f4",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
  },
  input: {
    width: "80%",
    padding: "10px",
    fontSize: "16px",
    marginBottom: "10px",
  },
  button: {
    padding: "10px 15px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default Average;