import React, { ReactElement } from "react";
import "./app-container.scss"
import { AnimatePresence } from "framer-motion";
import MobileNavigationBar from "../../components/mobile-navigation-bar/mobile-navigation-bar";
import NavigationBar from "../../components/navigation-bar/navigation-bar";
import { Provider, useSelector } from "react-redux";
import store from "../../state";
import TopProgressBar from "../../components/top-progress-bar/top-progress-bar";
import AppState from "../../models/app-state";

function AppContainer({ children }: { children: ReactElement }) {

  const TopProgress = () => {
    const isLoading = useSelector((state: AppState) => state.isLoading);
    return <TopProgressBar show={isLoading} />;
  }

  return (
    <div id="stella-container" style={{ display: "contents" }}>
      <Provider store={store}>
        <TopProgress />
        <MobileNavigationBar />
        <div id="home-page">
          <NavigationBar />
          <AnimatePresence>
            {children}
          </AnimatePresence>
        </div>
      </Provider>
    </div>
  );
}

export default AppContainer;