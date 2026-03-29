import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/shared/NavBar";
import OrganizationSignUpPage from "./pages/OrganizationSignUpPage";
import Footer from './components/shared/Footer';

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
        <Route path="/signup" element={<OrganizationSignUpPage />} />
      </Routes>
      <Footer /> 

    </BrowserRouter>
  );
}

export default App;