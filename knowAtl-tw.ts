const express = require('express');
const twilio = require('twilio');

const app = express();

// Your Twilio credentials
const accountSid = 'process.env.TWILIO_ACCOUNT_SID';
const authToken = 'process.env.TWILIO_AUTH_TOKEN';
const fromPhoneNumber = 'process.env.TWILIO_NUMBER';

// Initialize Twilio client
const client = twilio(accountSid, authToken);

// Function to send SMS
const sendSMS = async (to, body) => {
  try {
    const message = await client.messages.create({
      body: body,
      from: fromPhoneNumber,
      to: to,
    });
    console.log('Message sent:', message.sid);
    return true;
  } catch (error) {
    console.error('Error sending message:', error);
    return false;
  }
};

// Route to send SMS
app.get('/send-sms', async (req, res) => {
  const to = req.query.to;
  const body = req.query.body;

  if (!to || !body) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const result = await sendSMS(to, body);
  if (result) {
    res.json({ success: true });
  } else {
    res.status(500).json({ error: 'Failed to send SMS' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
