import React, { useState } from "react";
import s from "./global.module.scss";

import Canvas from "./components/Canvas/Canvas";
import Test from "./components/Test";

export default function App() {
    return (
        <>
            <Test />
            <div className={s.canvas}>
                <Canvas width={500} height={700} />
            </div>
        </>
    );
}
