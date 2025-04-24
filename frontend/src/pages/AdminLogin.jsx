import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/UseAuth';
import { adminLogin } from '../services/AdminService';

const AdminLogin = () => {
  const { setToken } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, expiresIn } = await adminLogin(username, password);

      setToken(token, expiresIn, username, null, "admin");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid username or password.");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-500"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-500"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700"
            >
                Login
            </button>
        </form>
    </div>
  )
}

export default AdminLogin
