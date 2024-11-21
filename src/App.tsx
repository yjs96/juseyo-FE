import Router from "@/router/Router";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <>
      <RecoilRoot>
        <Router></Router>
        <Toaster
          toastOptions={{
            style: {
              color: "#1c1c1c",
              background: "#fdfdfd",
              marginTop: "8px",
              fontSize: "14px",
            },
          }}
        />
      </RecoilRoot>
    </>
  );
}

export default App;
