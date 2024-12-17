import { useState } from "react";


export const Navbar = ({ time }: { time: string }) => {

    const [count, setCount] = useState(0)

    return (
        <div className="h-20  p-4 border-b">
            <h1>Navbar</h1>
            <p>{time}</p>
            <button onClick={() => setCount(count + 1)}>Count: {count}</button>
        </div>
    );
};
