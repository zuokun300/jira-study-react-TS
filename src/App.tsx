import React from "react";
import "./App.css";
import { ProjectList } from "./screens/project-list";
import { TsReactTest } from "./try-use-array";
import { useAuth } from "./context/auth-context";
import { AuthenticatedApp } from "./authenticated-app";
import { UnauthenticatedApp } from "./unauthenticated-app";
import { ErrorBoundary } from "./components/error-boundary";
import { FullPageLoadingErrorCallback } from "./components/lib";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallBackRender={FullPageLoadingErrorCallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
