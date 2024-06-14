import twilio from 'twilio';


// Your Twilio credentials
const accountSid = 'AC57e057b3d53c339828ea08e14a8898f6';
const authToken = 'bd0c6a183d8b1f2981c3e4da2e8606d1';
// Testing
const fromPhoneNumber = '+18554500256';

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