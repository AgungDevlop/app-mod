import { Outlet } from "react-router-dom";
import Layout from "./components/Layout.tsx"; // Sesuaikan dengan jalur Anda

function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default App;