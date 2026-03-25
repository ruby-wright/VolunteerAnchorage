import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/shared/NavBar";
import OrganizationSignUpPage from "./pages/OrganizationSignUpPage";

function Home() {
  return <div></div>;
}

function Opportunities() {
  return <div></div>;
}

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/signin" element={<OrganizationSignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;