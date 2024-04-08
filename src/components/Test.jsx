import React, { useState } from "react";

import s from "./test.module.scss";

export default function Test() {
    const [count, setCount] = useState(0);

    const handleCount = () => {
        setCount((prev) => prev + 1);
    };

    return (
        <>
            <h2>{count}</h2>
            <button type="button" onClick={handleCount}>
                Increase
            </button>
        </>
    );
}
