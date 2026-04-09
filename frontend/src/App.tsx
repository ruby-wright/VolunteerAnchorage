import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/shared/NavBar";
import OrganizationSignUpPage from "./pages/OrganizationSignUpPage";
import HomePage from "./pages/HomePage";
import YourOpportunitiesPage from "./pages/YourOpportunitiesPage";
import Footer from './components/shared/Footer';
import ConnectForm from "./pages/ConnectForm";

function Opportunities() {
  return <div></div>;
}

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/your-opportunities" element={<YourOpportunitiesPage />} />
        <Route path="/signup" element={<OrganizationSignUpPage />} />
        <Route path="/connect" element={<ConnectForm />} />
        <Route path="/connect/:opportunityId" element={<ConnectForm />} />
      </Routes>
      <Footer /> 

    </BrowserRouter>
  );
}

export default App;