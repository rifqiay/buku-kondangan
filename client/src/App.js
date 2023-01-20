import Login from "./pages/auth/Login/Login";
import Register from "./pages/auth/Register/Register";
import Barang from "./pages/Barang/Barang";
import Profile from "./pages/Profile/Profile";
import TambahData from "./pages/Tambah-Data/TambahData";
import EditUang from "./pages/EditUang/EditUang";
import EditBarang from "./pages/EditBarang/EditBarang";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Auth from "./config/auth/Auth";
import "./style.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace="true" />} />
          <Route
            path="/home"
            element={
              <Auth>
                <Home />
              </Auth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/barang"
            element={
              <Auth>
                <Barang />
              </Auth>
            }
          />
          <Route
            path="/profile"
            element={
              <Auth>
                <Profile />
              </Auth>
            }
          />
          <Route
            path="/tambah-data"
            element={
              <Auth>
                <TambahData />
              </Auth>
            }
          />
          <Route
            path="home/edit-uang/:id"
            element={
              <Auth>
                <EditUang />
              </Auth>
            }
          />
          <Route
            path="barang/edit-barang/:id"
            element={
              <Auth>
                <EditBarang />
              </Auth>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
