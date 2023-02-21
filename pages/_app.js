import Head from "next/head";
import store from "../store/redux-store";
import { Provider as ReduxProvider } from "react-redux";

import { ToastContainer } from "react-toastify";
import { Provider } from "next-auth/client";
import { UserContextProvider } from "./../store/user-context";
import { CommentsContextProvider } from "./../store/comment-context";

import "react-toastify/dist/ReactToastify.css";
import "../styles/main.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import "boxicons/css/boxicons.min.css";
import "nextjs-admin-table/dist/css/admin.css";
import "../styles/quill.snow.css";
import "antd/dist/antd.css";

function MyApp({ Component, pageProps }) {
  return (
    <ReduxProvider store={store}>
      <UserContextProvider>
        <CommentsContextProvider>
          <Provider session={pageProps.session}>
            <Head>
              <title>Next Anime</title>
              <meta
                name="description"
                content="find about a lot of great animes."
              />
              <meta
                name="viewport"
                content="intial-scale=1.0,width=device-width"
              />
            </Head>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <Component {...pageProps} />
          </Provider>
        </CommentsContextProvider>
      </UserContextProvider>
    </ReduxProvider>
  );
}

export default MyApp;
