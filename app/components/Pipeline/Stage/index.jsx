import * as React from "react";
import style from "./style.less";

export default function({ label }) {
    return (
        <div className={style.stage}>
            <div className={style.stageName}>{label}</div>
        </div>
    );
};

