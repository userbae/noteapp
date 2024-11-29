import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app";
import { RecoilRoot } from "recoil";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

createRoot(document.getElementById("root")!).render(
  <>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </>
);
