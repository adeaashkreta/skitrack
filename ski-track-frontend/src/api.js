// src/api.js
import axios from 'axios';

export default axios.create({
  // Make sure this matches the port your Express server is listening on
  baseURL: 'http://localhost:3000/api',
});
