import twilio from 'twilio';


// Your Twilio credentials
const accountSid = 'process.env.TWILIO_ACCOUNT_SID';
const authToken = 'process.env.TWILIO_AUTH_TOKEN';
// Testing
const fromPhoneNumber = 'process.env.TWILIO_NUMBER';

// Initialize Twilio client
const client = twilio(accountSid, authToken);

// Function to send SMS
const sendSMS = async (to: string, from: string, body: string) => {
  try {
    const message = await client.messages.create({
      body: body,
      from: from,
      to: to,
    });
    console.log('Message sent:', message.sid);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error sending message:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
};


// Example usage
sendSMS('+16789828622', fromPhoneNumber, 'Hello from Twilio!');