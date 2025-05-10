# Environment Variables Setup

This project uses environment variables to manage sensitive information like API keys. Follow these steps to set up your environment:

## Setting Up Environment Variables

1. Create a `.env` file in the root directory of the project
2. Add the following variables to the file:

```
# UptimeRobot API key
VITE_UPTIMEROBOT_API_KEY=u2086732-b02119a20d7dc8f1fc75a99c
```

## UptimeRobot API Integration

The Server Status page uses the UptimeRobot API to display real-time information about your server uptime. For this to work correctly:

1. Make sure your UptimeRobot API key is valid and has access to the monitors you want to display
2. If you encounter CORS issues (which are common with direct API calls from browsers), you can:
   - Use the "Use Proxy" button on the Server Status page to route requests through a CORS proxy
   - Configure your own proxy server and update the `CORS_PROXIES` array in `src/lib/api/uptimeApi.ts`
   - Set up a backend endpoint that makes the API calls for you (more secure)

## Server-Side Proxy Solution (Recommended)

For a more reliable long-term solution, we recommend implementing a simple server-side API proxy. This avoids CORS issues entirely and protects your API key from exposure.

### Option 1: Create a serverless function (Vercel/Netlify)

```javascript
// api/uptime.js - Vercel serverless function example
const axios = require('axios');

export default async function handler(req, res) {
  try {
    const response = await axios.post('https://api.uptimerobot.com/v2/getMonitors', {
      api_key: process.env.UPTIMEROBOT_API_KEY,
      format: 'json',
      logs: 1,
      custom_uptime_ratios: '1-7-30-90',
      response_times: 1,
      response_times_limit: 10,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      }
    });
    
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch UptimeRobot data' });
  }
}
```

### Option 2: Simple Express proxy (for a Node.js backend)

```javascript
// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/uptime', async (req, res) => {
  try {
    const response = await axios.post('https://api.uptimerobot.com/v2/getMonitors', {
      api_key: process.env.UPTIMEROBOT_API_KEY,
      format: 'json',
      logs: 1,
      custom_uptime_ratios: '1-7-30-90',
      response_times: 1,
      response_times_limit: 10,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      }
    });
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch UptimeRobot data' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

After implementing one of these server-side solutions, update the `BASE_URL` in `src/lib/api/uptimeApi.ts` to point to your new endpoint.

## Troubleshooting

If no data appears on the Server Status page:

1. Check your browser console for error messages
2. Verify your API key is correct in your `.env` file
3. Try the "Test API" button to make a direct connection attempt
4. If you see CORS errors, try the "Use Proxy" option
5. If proxies don't work, consider implementing a server-side solution

## Important Notes

- Never commit your `.env` file to version control
- Make sure `.env` is included in your `.gitignore` file
- For production environments, set these variables in your hosting platform's environment settings
- The current implementation includes a fallback value for development, but this is not a secure practice for production

## Using Environment Variables

Environment variables are accessed in the code using:

```javascript
const apiKey = import.meta.env.VITE_UPTIMEROBOT_API_KEY;
```

Remember that all environment variables in Vite need to be prefixed with `VITE_` to be exposed to client-side code. 