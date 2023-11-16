import { useState } from "react"

function useInput(type) {
    const [value, setValue] = useState("");
    const input = <input type={type} onChange={e => setValue(e.target.value) } value={value} />;
    return [value, input];
}

export default useInput