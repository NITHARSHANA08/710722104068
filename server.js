import express from "express";
import bodyParser from "body-parser";
import cors from "cors";


const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// API Route to Calculate Average
app.post("/calculate-average", (req, res) => {
    const { numbers } = req.body;

    if (!numbers || !Array.isArray(numbers)) {
        return res.status(400).json({ error: "Invalid input. Must be an array of numbers." });
    }

    if (numbers.some(isNaN)) {
        return res.status(400).json({ error: "Array must contain only numbers." });
    }

    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const avg = sum / numbers.length;

    res.json({ average: avg.toFixed(2) });
});

app.listen(PORT, () => console.log("Server running at http://localhost:${PORT}"));