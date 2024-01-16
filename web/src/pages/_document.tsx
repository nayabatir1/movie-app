import { Html, Head, Main, NextScript } from "next/document";
import { ToastContainer } from "react-toastify";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <div className="fixed bottom-0 bg-curves w-full h-[111px] bg-no-repeat bg-cover	" />
        <ToastContainer />
      </body>
    </Html>
  );
}
