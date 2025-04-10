import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { mainStore } from "@/lib/appstate";
import AuthCheck from "@/components/common/authCheck";

import { ToastContainer } from "react-toastify";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={mainStore}>
      <div>
        <AuthCheck />
        <div className="">
          <div className="flex-1 max-sm:w-full  mx-auto h-screen overflow-x-hidden ">
            <div className="overflow-x-hidden">
              <Component {...pageProps} />
              <ToastContainer position="bottom-center" autoClose={1000} />
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
}
