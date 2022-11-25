import { User } from "firebase/auth";
import { useState } from "react"

function useSubscription(user?: User) {
    const [subscription, setSubscripion] = useState<any>();

    return (
        <div>useSubscription</div>
    )
}

export default useSubscription