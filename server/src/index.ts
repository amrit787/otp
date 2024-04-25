// src/index.ts
import express from 'express';
import path from 'path';
import { validateOtp } from './lib/validate';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());

// app.get('*', (req, res) => {
//   res.sendFile('./public/index.html');
// });
app.post('/otp', (req, res) => {
  let otp = req.body?.otp as string | undefined;

  let error = validateOtp(otp);

  if (error) {
    return res.status(400).json({ success: false, error });
  }

  res.json({ success: true, message: 'Verification Successful' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
