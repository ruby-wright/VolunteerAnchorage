import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/shared/NavBar";
import OrganizationSignUpPage from "./pages/OrganizationSignUpPage";
import HomePage from "./pages/HomePage";
import YourOpportunitiesPage from "./pages/YourOpportunitiesPage";
import Footer from "./components/shared/Footer";
import ConnectForm from "./pages/ConnectForm";
import OpportunitiesPage from "./pages/OpportunitiesPage";
import OrganizationProfilePage from "./pages/OrganizationProfilePage";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/opportunities" element={<OpportunitiesPage />} />
        <Route path="/your-opportunities" element={<YourOpportunitiesPage />} />
        <Route path="/signup" element={<OrganizationSignUpPage />} />
        <Route path="/connect" element={<ConnectForm />} />
        <Route path="/connect/:opportunityId" element={<ConnectForm />} />
        <Route path="/organization-profile" element={<OrganizationProfilePage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;