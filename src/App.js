import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./common/layout/layout";
import { Kids } from "./pages/kids/kids";
import { Men } from "./pages/men/men";
import { Women } from "./pages/women/women";

function App() {
  return (
    <>
      <BrowserRouter>
      <Layout>
      <Routes>
        <Route path='/' exact element={<Navigate to="/women" />}/>
        <Route path='/women' element={<Women />} />
        <Route path='/men' element={<Men />} />
        <Route path='/kids' element={<Kids />} />
      </Routes>
      </Layout>
      </BrowserRouter>

    </>
  );
}

export default App;
