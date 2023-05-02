import SearchApp from "./componets/body/searcher/SearchApp";
import Menu from "./componets/header/Menu";
import ServiceNote from "./componets/body/serviceNote/ServiceNote";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllServices from "./componets/body/serviceNote/AllServices";

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu/>
        <Routes>
          <Route path="elevators_app" element={<SearchApp />} />
          <Route path="elevators_app/serviceNote" element={<ServiceNote />} />
          <Route path="elevators_app/allServices" element={<AllServices  />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
