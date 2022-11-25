import { CheckIcon } from "@heroicons/react/24/outline"
import Head from "next/head"
import Link from "next/link"
import { useState } from "react"
import { useRecoilState } from "recoil"
import { subscriptionState } from "../atoms/modalAtom"
import useAuth from "../hooks/useAuth"
import Loader from "./Loader"
import Table from "./Table"

function Plans() {
    const { logout, user } = useAuth()
    const [isSubscription, setIsSubscription] = useRecoilState<boolean>(subscriptionState);

    const [selectedPlan, setSelectedPlan] = useState<string>('Premium');
    const [isBillingLoading, setIsBillingLoading] = useState<boolean>(false);

    const subscribeToPlan = () => {
        if (!user) return;

        setIsBillingLoading(true);
        setTimeout(() => {
            setIsSubscription(true);
            setIsBillingLoading(false);
        }, 1500)
    }

    return (
        <div>
            <Head>
                <title>Netflix</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className="border-b border-white/10 bg-[#141414]">
                <Link href='/'>
                    <img
                        src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
                        alt='Netflex'
                        width={150}
                        height={90}
                        className='object-contain cursor-pointer'
                    />
                </Link>
                <button
                    className="text-lg font-medium hover:underline"
                    onClick={logout}
                >
                    Sign Out
                </button>
            </header>

            <main className="max-w-5xl px-5 pb-12 transition-all pt-28 md:px-10">
                <h1 className="mb-3 text-3xl font-medium">
                    Choose the plan that's right for you
                </h1>
                <ul>
                    <li className="flex items-center text-lg gap-x-2">
                        <CheckIcon className="h-7 w-7 text-[#E50914]" />
                        Watch all you want. Ad-free.
                    </li>
                    <li className="flex items-center text-lg gap-x-2">
                        <CheckIcon className="h-7 w-7 text-[#E50914]" />
                        Recomendations just for you.
                    </li>
                    <li className="flex items-center text-lg gap-x-2">
                        <CheckIcon className="h-7 w-7 text-[#E50914]" />
                        Change or cancel your plan anytime.
                    </li>
                </ul>

                <div className="flex flex-col mt-4 space-y-4">
                    <div className="flex items-center self-end justify-end w-full md:w-3/5">
                        {
                            ['Basic', 'Standard', 'Premium'].map((item, index) => {
                                return (
                                    <div
                                        key={`type_${index}`}
                                        className={`planBox ${selectedPlan === item ? 'opacity-100' : 'opacity-60'}`}
                                        onClick={() => {
                                            setSelectedPlan(item);
                                        }}
                                    >
                                        {item}
                                    </div>
                                )
                            })
                        }
                    </div>

                    <Table selectedPlan={selectedPlan} />
                    <button
                        disabled={!selectedPlan || isBillingLoading}
                        className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${isBillingLoading && 'opacity-60'
                            }`}
                        onClick={subscribeToPlan}
                    >
                        {
                            isBillingLoading ?
                                <Loader color="dark:fill-gray-300" />
                                :
                                'Subscribe'
                        }
                    </button>
                </div>
            </main>
        </div>
    )
}

export default Plans