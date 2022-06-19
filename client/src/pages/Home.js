import React from "react";
import { Event, CreateEvent } from "../components/";
export const Home = () => {

    return (
        <div style={ styles.container }>
            <CreateEvent />
            <Event />
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
        margin: 20,
        padding: 20,
    }
};
