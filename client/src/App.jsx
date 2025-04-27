import React from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { themeChange } from "./redux/slice/ThemeSlice/ThemeSLice";
import Layout from "./Auth/Layout";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import NotFound from "./NotFound/NotFound";
import ChatPage from "./components/Chat/ChatPage";
import { ChatProvider } from "./contexts/ChatContext";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/signin" replace />;
};

const App = () => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <div className={`fullBoard ${theme ? "lightTheme" : "darkTheme"}`}>
      {/* theme toggle */}
      {pathname === "/chat" ? (
        // <input
        //   type="checkbox"
        //   className="themeBtnChat theme-checkbox"
        //   onClick={() => dispatch(themeChange())}
        // />
        ""
      ) : (
        <input
          type="checkbox"
          className="themeBtn theme-checkbox"
          onClick={() => dispatch(themeChange())}
        />
      )}

      <Routes>
        {/* redirect root to signin */}
        <Route path="/" element={<Navigate to="/signin" replace />} />

        {/* public auth routes */}
        <Route element={<Layout />}>
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Login />} />
        </Route>

        {/* protected home/dashboard if you still use Home */}
        <Route
          path="chat/*"
          element={
            <PrivateRoute>
              {/* wrap chat routes in ChatProvider */}
              <ChatProvider>
                <ChatPage />
              </ChatProvider>
            </PrivateRoute>
          }
        />

        {/* catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
