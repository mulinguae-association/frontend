import "./App.scss";
import { RouterProvider } from "react-router-dom";
import axios from "axios";
import router from "./routes";

axios.defaults.baseURL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className={"App"}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
