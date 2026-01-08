import express from 'express';
import cors from 'cors';
import { auth } from 'express-oauth2-jwt-bearer';

const app = express();

app.use(cors());
app.use(express.json());

const checkJwt = auth({
  audience: 'https://proba-api',
  issuerBaseURL: 'https://dev-m4zzyipdlsq4qe6h.us.auth0.com/',
});

app.get('/api/public', (req, res) => {
  res.json({ message: 'Public endpoint' });
});
app.get('/api/private', checkJwt, (req, res) => {
  res.json({
    message: 'Protected data. You are authenticated via OpenID Connect!',
    user: req.auth.payload,
  });
});
app.listen(3000, () => {
  console.log('API running on http://localhost:3000');
});
