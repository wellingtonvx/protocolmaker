import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { DataContextProvider } from "../context/DataContext";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <DataContextProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={2000} />
    </DataContextProvider>
  );
}

export default MyApp;
