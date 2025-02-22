const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.get("/bfhl", (req, res) => {
  res.json({
    operation_code: 1,
  });
});

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ error: "Invalid input format" });
    }

    const alphabets = data
      .filter((char) => /^[A-Za-z]$/.test(char))
      .map((char) => char.toUpperCase())
      .sort();

    const numbers = data
      .filter((char) => /^[0-9]+$/.test(char))
      .map(Number);

    const highestAlphabet = alphabets.length > 0 ? [alphabets[alphabets.length - 1]] : [];

    res.json({
      is_success: true,
      user_id: "your_email@domain.com",
      email: "your_email@domain.com",
      roll_number: "Your_Roll_Number",
      alphabets,
      numbers,
      highest_alphabet: highestAlphabet,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
