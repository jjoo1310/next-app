import { useState } from "react";
import useAuth from "../hooks/useAuth";
import useSubscription from "../hooks/useSubscription";
import Loader from "./Loader"

function Membership() {
    const { user } = useAuth()
    const subscription = useSubscription(user);
    const [isBillingLoading, setIsBillingLoading] = useState<boolean>(false);

    const manageSubscription = () => {
        if (subscription) {
            setIsBillingLoading(true)
        }
    }

    return (
        <div className="grid grid-cols-1 px-4 mt-6 border gap-x-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
            <div className="py-4 space-y-2">
                <h4 className="text-lg text-[gray]">Membership & Billing</h4>
                <button
                    disabled={isBillingLoading || !subscription}
                    className="w-3/5 h-10 py-2 text-sm font-medium text-black bg-gray-300 shadow-md whitespace-nowrap hover:bg-gray-200 md:w-4/5"
                    onClick={manageSubscription}
                >
                    {isBillingLoading ? (
                        <Loader color="dark:fill-[#e50914]" />
                    ) : (
                        'Cancel Membership'
                    )}
                </button>
            </div>

            <div className="col-span-3">
                <div className="flex flex-col justify-between py-4 border-b border-white/10 md:flex-row">
                    <div className="">
                        <p className="font-medium">{user?.email}</p>
                        <p className="text-[gray]">Password: ********</p>
                    </div>
                    <div className="md:text-right">
                        <p className="membershipLink">Change email</p>
                        <p className="membershipLink">Change password</p>
                    </div>
                </div>

                <div>
                    <div>
                        <p>
                            {'Your membership'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Membership