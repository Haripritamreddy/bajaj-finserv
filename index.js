const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// Your personal details
const USER_ID = "alapatiharipritamreddy_10092004";
const EMAIL = "alapatihari.pritam2021@vitstudent.ac.in";
const ROLL_NUMBER = "21BDS0230";

app.use((req, res, next) => {
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);
  next();
});

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      throw new Error('Invalid input: data must be an array');
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item) && item.length === 1);
    const highestLowercase = alphabets
      .filter(char => char === char.toLowerCase())
      .sort((a, b) => b.localeCompare(a))[0] || [];

    res.json({
      is_success: true,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : []
    });
  } catch (error) {
    res.status(400).json({ is_success: false, error: error.message });
  }
});

app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});