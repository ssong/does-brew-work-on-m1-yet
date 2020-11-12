import axios from 'axios'
import rateLimit from 'axios-rate-limit'

// Sends a REST api request to https://api.github.com/repos/Homebrew/brew/issues/7857 and checks its status
const responseText = {
  open: 'Not yet',
  closed: "It's ready!"
}

// Rate limit to 1 request per hour
const http = rateLimit(axios.create(), {
  maxRequests: 1,
  perMilliseconds: 3600000
})

export default async (req, res) => {
  const {
    data: { state }
  } = await http.get('https://api.github.com/repos/Homebrew/brew/issues/7857')
  res.json({ status: responseText[state] })
}
