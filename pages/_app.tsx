import { store, persistor } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { CartProvider } from "@/contexts/CartContext";
import { ProductProvider } from "@/contexts/ProductContext";
import { ThemeProvider } from "@/theme/ThemeProvider";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "@/styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { TranslateProvider } from "@/contexts/TranslateContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Theme appearance="dark">
          <ProductProvider>
            <CartProvider>
              <TranslateProvider>
                <Component {...pageProps} />
                <ToastContainer />
              </TranslateProvider>
            </CartProvider>
          </ProductProvider>
        </Theme>
      </PersistGate>
    </Provider>
  );
}
