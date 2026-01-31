import "./App.scss";
import { RouterProvider } from "react-router-dom";
import axios from "axios";
import router from "./routes";
import i18n from "./i18n";

axios.defaults.baseURL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Accept-Language"] = i18n.language;
function App() {
  return (
    <div className={"App"}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
