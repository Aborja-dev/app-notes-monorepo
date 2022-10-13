import axios from 'axios'
const baseURL = '/api'
const login = async (user) => {
  const response = await axios.post(`${baseURL}/login`, user)
  return response.data
}

export default { login }
