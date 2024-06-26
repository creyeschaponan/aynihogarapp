import { useEffect, useState } from 'react'

const useCodeVerify = (pin : any) => {
    const [pined, setPin] = useState(pin);
    useEffect(() => {
        setPin(pin);
    }, [pin])
    return {pined, setPin}
}

export default useCodeVerify;