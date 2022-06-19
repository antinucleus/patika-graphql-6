import React from "react";
import { Route, Routes as RouterSwitcher } from "react-router-dom";
import { EventDetails, Home } from "../pages";
export const Routes = () => (
    <RouterSwitcher>
        <Route path="/" element={ <Home /> } />
        <Route path="/event/:id" element={ <EventDetails /> } />

    </RouterSwitcher>
);