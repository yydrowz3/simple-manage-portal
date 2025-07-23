// import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Login from "./features/auth/Login.tsx";
import { Toaster } from "sonner";
import PageNotFound from "./ui/PageNotFound.tsx";
import Signup from "./features/auth/Signup.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "./ui/AppLayout.tsx";
import Home from "./features/pages/Home.tsx";
import PortalHome from "./features/portal/PortalHome.tsx";
import ScoreList from "./features/score/ScoreList.tsx";
import ScoreEdit from "./features/score/ScoreEdit.tsx";
import ScoreUpload from "./features/score/ScoreUpload.tsx";
import StudentList from "./features/student/StudentList.tsx";
import StudentEdit from "./features/student/StudentEdit.tsx";
import StudentCreate from "./features/student/StudentCreate.tsx";
import Profile from "./features/user/Profile.tsx";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="" element={<AppLayout />}>
                        <Route path="" element={<Navigate to="/portal" />} />
                        <Route path="portal" element={<Home />}>
                            <Route path="" element={<PortalHome />} />
                            <Route path="score">
                                <Route path="" element={<ScoreList />} />
                                <Route path=":id" element={<ScoreEdit />} />
                                <Route
                                    path="upload"
                                    element={<ScoreUpload />}
                                />
                            </Route>
                            <Route path="student">
                                <Route path="" element={<StudentList />} />
                                <Route path=":id" element={<StudentEdit />} />
                                <Route path="add" element={<StudentCreate />} />
                            </Route>
                            <Route path="profile" element={<Profile />} />
                        </Route>
                    </Route>

                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
            <Toaster position="top-right" />
        </QueryClientProvider>
    );
}

export default App;
