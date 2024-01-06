import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./app/store";
import {
  // HashRouter as Router,
  BrowserRouter  as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import App from "./App";
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { Catalogue } from "./pages/Catalogue";
import { Cart } from "./pages/CartPage";
import { ItemPage } from "./pages/ItemPage";
import { Favourites } from "./pages/Favourites";
import { Loader } from './Components/Loader';

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <Router>
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
