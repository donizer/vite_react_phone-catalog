import "./index.css";

import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { persistor, store } from "./app/store";

import { App } from "./App";
import { Cart } from "./pages/CartPage";
import { Catalogue } from "./pages/Catalogue";
import { Favourites } from "./pages/Favourites";
import { Home } from "./pages/Home";
import { ItemPage } from "./pages/ItemPage";
import { Loader } from "./Components/Loader";
import { NotFound } from "./pages/NotFound";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <Router basename="vite_react_phone-catalog">
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path=":catalogueId" element={<Catalogue />}>
                <Route path=":itemId" element={<ItemPage />} />
              </Route>
              <Route path="favourites" element={<Favourites />} />
              <Route path="cart" element={<Cart />} />
              <Route path="home" element={<Navigate to="/" />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
