import "../styles/globals.css";
import Head from "next/head";
import "../public/css/base.css";
import "../public/css/justified.css";
import "../public/css/fontello.css";
import "../public/css/magnific-popup.css";
import "../public/css/swiper.css";
import "../public/css/style.css";
import "../public/css/custom.css";
import "../public/css/slick..css";
import "../node_modules/metismenujs/dist/metismenujs.css";
import "react-toastify/dist/ReactToastify.css";
//redux
import { Provider } from "react-redux";
import store from "../components/store/index";

import { ToastContainer } from "react-toastify";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="description" content="CFM" />
        <meta name="author" content="TrendyCoder" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
        {/* <!-- Google Fonts --> */}
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"/> */}
        <link
          href="./public/css/font/Black-Bison.ttf"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      <ToastContainer
        position="top-left"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
