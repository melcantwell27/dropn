export default function handler(req, res) {
    // Retrieve the CSRF token from the request cookies
    const csrfToken = req.cookies['csrftoken'];
    
    // Return the CSRF token in the response
    res.status(200).json({ csrfToken });
  }