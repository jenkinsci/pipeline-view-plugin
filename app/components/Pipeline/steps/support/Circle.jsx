import * as React from "react";

export default function Circle({ r } = { r: 5 }) {
    return (
        <svg width={r*2} height={r*2} viewBox={`0 0 ${r*2} ${r*2}`}>
            <circle cx={r} cy={r} r={r} fill="rgb(111, 182, 47)" stroke-width="0"/>
        </svg>
    );
};
