import Navbar from "./components/navbar";
import Utama from "./page/utama";
import Login from "./page/login";
import Register from "./page/register";
import EditProfile from "./page/edit-profile";
import KegiatanPage from "./page/kegiatan";
import InputKegiatan from "./page/input-kegiatan";
import Admin from "./page/admin";
import KegiatanDetail from "./page/kegiatan-detail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Utama />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/kegiatan" element={<KegiatanPage />} />
        <Route path="/input-kegiatan" element={<InputKegiatan />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/kegiatan/:id" element={<KegiatanDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
