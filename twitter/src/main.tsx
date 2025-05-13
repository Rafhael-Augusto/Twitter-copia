import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { GlobalStyle } from "./globalReset.ts";

import App from "./components/feed/App.tsx";
import ReadPost from "./components/readPost/ReadPost.tsx";
import UserProfile from "./components/userProfile/UserProfile.tsx";
import LeftSide from "./components/leftSide/LeftSide.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <LeftSide />
      <Routes>
        <Route path="/home" element={<App />} />
        <Route
          path="/:username/status/:userId/:postId"
          element={<ReadPost />}
        />
        <Route path="/:username/:userId/profile" element={<UserProfile />} />
      </Routes>
    </Router>
    <GlobalStyle />
  </StrictMode>
);
