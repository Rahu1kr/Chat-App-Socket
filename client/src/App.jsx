// import React from "react";
// import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
// import Login from "./Auth/Login";
// import Signup from "./Auth/Signup";
// // import socketIO from "socket.io-client";
// import { useDispatch, useSelector } from "react-redux";
// import { themeChange } from "./redux/slice/ThemeSlice/ThemeSLice";
// import Layout from "./Auth/Layout";
// import Home from "./components/Home";
// import NotFound from "./NotFound/NotFound";
// import ChatBody from "./components/ChatBody";

// const App = () => {
//   // const socket = socketIO.connect("http://localhost//8000");
//   const theme = useSelector(state => state.theme);
//   // const navigate = useNavigate();
//   // console.log(theme);
//   const dispatch = useDispatch();
//   const token = localStorage.getItem("token");

//   const PrivateRoute = () => {
//     return token ? <Outlet /> : <Navigate to="/signin" />;
//   };

//   return (
//     <div className={`fullBoard ${theme ? "lightTheme" : "darkTheme"}`}>
//       <input
//         onClick={() => dispatch(themeChange())}
//         type="checkbox"
//         className="themeBtn theme-checkbox"
//       ></input>
//       <Routes>
//         <Route path="/" element={<Navigate to="/signin" replace />} />
//         <Route element={<Layout />}>
//           <Route path="signup" element={<Signup />} />
//           <Route path="signin" element={<Login />} />
//         </Route>

//         <Route
//           path="chat/*"
//           element={
//             <PrivateRoute>
//               <Home />
//             </PrivateRoute>
//           }
//         >
//           {/* these are relative to /chat */}
//           <Route index element={<ChatBody />} />
//           {/* <Route path="settings" element={< />} /> */}
//           {/* add more <Route path="foo" element={<Foo />} /> here */}
//         </Route>

//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;

// src/App.jsx
import React from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { themeChange } from "./redux/slice/ThemeSlice/ThemeSLice";
import Layout from "./Auth/Layout";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
// import Home from "./components/Home";
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
