import { useState } from 'react'

function useInput(type, placeholder='') {
    const [value, setValue] = useState('')
    const input = <input type={type} 
                   onChange={e => setValue(e.target.value)} 
                   value={value} placeholder={placeholder} 
                   />
    return [value, input]
}

export default useInput