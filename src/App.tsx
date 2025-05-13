import "./App.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { DataView } from "./pages/DataView";
import { Route, Routes } from "react-router";
import { LandingPage } from "./pages/LandingPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/graph/:productNumber" element={<DataView />}></Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
