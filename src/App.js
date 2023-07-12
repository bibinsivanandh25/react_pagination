import { Fragment } from "react";
import Pagination from "./components/Pagination";
import Navbar from "./pages/Navbar";

function App() {
  return (
    <Fragment>
      <Navbar />
      <Pagination />
    </Fragment>
  );
}

export default App;
