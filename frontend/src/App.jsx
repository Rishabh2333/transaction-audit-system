import { useState, useEffect } from "react";
import api from "./api";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const login = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setLoggedIn(true);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return (
      <div className="container">
        <h2>Login</h2>
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return <Dashboard onLogout={logout} />;
}

function Dashboard({ onLogout }) {
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");
  const [history, setHistory] = useState([]);
  const [balance, setBalance] = useState("Loading...");

  const loadUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setBalance(res.data.balance);
    } catch (err) {
      alert("Session expired. Please login again.");
      localStorage.removeItem("token");
      window.location.reload();
    }
  };

  const transfer = async () => {
    if (!receiverId || !amount) {
      alert("Please enter receiver ID and amount");
      return;
    }

    try {
      const res = await api.post("/transactions/transfer", {
        receiverId: Number(receiverId),
        amount: Number(amount)
      });
      alert("Transfer successful");
      setBalance(res.data.balance);
      setReceiverId("");
      setAmount("");
      loadHistory();
    } catch (err) {
      alert(err.response?.data?.message || "Transfer failed");
    }
  };

  const loadHistory = async () => {
    try {
      const res = await api.get("/transactions/history");
      setHistory(res.data.history);
    } catch {
      alert("Failed to load history");
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="container">
      <button
        onClick={onLogout}
        style={{ float: "right", width: "auto", padding: "6px 12px" }}
      >
        Logout
      </button>

      <h2>Dashboard</h2>
      <h3>Current Balance: ₹{balance}</h3>

      <h2>Transfer Funds</h2>
      <input
        placeholder="Receiver ID"
        value={receiverId}
        onChange={e => setReceiverId(e.target.value)}
      />
      <input
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <button onClick={transfer}>Send</button>

      <h2>Transaction History</h2>
      <button onClick={loadHistory}>Load History</button>

      <ul>
        {history.map(h => (
          <li key={h.id}>
            {h.senderId === h.receiverId
              ? "Self"
              : h.senderId === Number(localStorage.getItem("userId"))
              ? "Sent"
              : "Received"}{" "}
            | ₹{h.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
