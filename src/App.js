import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './views/Login';
import Locations from './views/Locations';
import Restraurents from './views/Restraurents';
import ProtectedRoute from './ProtectedRoute';
import { store, persistor } from "./redux/store"
import { PersistGate } from "redux-persist/integration/react";

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Locations />} />
              <Route path="/restraurents/:id" element={<Restraurents />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App
