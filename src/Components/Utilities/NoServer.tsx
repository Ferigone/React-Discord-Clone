// React Component

import React from "react";

const NoServer = () => {
    return (
        <React.Fragment>
            <div className="no_server">
                <h1 className="no_server__title">No Server Selected</h1>
                <p className="no_server__text">
                    Select a server from the sidebar to view its channels
                </p>
            </div>
        </React.Fragment>
    );
};

export default NoServer;