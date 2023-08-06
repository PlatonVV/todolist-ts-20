import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import "app/App.module.css";
import { ErrorSnackbar } from "common/components";
import { useActions } from "common/hooks";
import { selectIsInitialized } from "app/app.selectors";
import { authThunks } from "features/auth/auth.slice";
import { Routing } from "app/routing/routing";
import { Header } from "app/header/header";
import s from "./App.module.css";

function App() {
  const isInitialized = useSelector(selectIsInitialized);
  const { initializeApp } = useActions(authThunks);

  useEffect(() => {
    initializeApp({});
  }, []);

  if (!isInitialized) {
    return (
      <div className={s.circularProgress}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <BrowserRouter>
      <div className="App">
        <ErrorSnackbar />
        <Header />
        <Routing />
      </div>
    </BrowserRouter>
  );
}

export default App;

// style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}
