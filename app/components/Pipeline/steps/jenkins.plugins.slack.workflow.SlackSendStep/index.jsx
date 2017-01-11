import * as React from "react";
import icon from "./index.svg";

export default function({ node }) {
    return (
        <svg width="32px" height="32px">
            <use xlinkHref={icon}/>
        </svg>
    );
};
