import { Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import TradeForm from "./components/TradeForm.jsx";
import Account from "./pages/Account.jsx";
import Trade from "./pages/Trade.jsx"; // new import

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/portfolio" element={<Portfolio showDelete showEdit />} />
        <Route path="/trade" element={<Trade />} /> {/* updated route */}
        <Route path="/account" element={<Account />} />
      </Routes>
    </Layout>
  );
}

export default App;
