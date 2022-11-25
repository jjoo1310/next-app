import { CheckIcon } from "@heroicons/react/24/outline";

interface Props {
    selectedPlan: string;
}

function Table(props: Props) {
    const { selectedPlan } = props;

    return (
        <table>
            <tbody className="divide-y devide-[gray]">
                <tr className="tableRow">
                    <td className="tableDataTitle">Monthly price</td>
                    <td className={`tableDataFeature ${selectedPlan === 'Basic' ? 'text-[#E50914]' : 'text-[gray]'}`}>{'500'}원</td>
                    <td className={`tableDataFeature ${selectedPlan === 'Standard' ? 'text-[#E50914]' : 'text-[gray]'}`}>{'1,000'}원</td>
                    <td className={`tableDataFeature ${selectedPlan === 'Premium' ? 'text-[#E50914]' : 'text-[gray]'}`}>{'1,500'}원</td>
                </tr>

                <tr className="tableRow">
                    <td className="tableDataTitle">Video quality</td>
                    <td className={`tableDataFeature ${selectedPlan === 'Basic' ? 'text-[#E50914]' : 'text-[gray]'}`}>Good</td>
                    <td className={`tableDataFeature ${selectedPlan === 'Standard' ? 'text-[#E50914]' : 'text-[gray]'}`}>Better</td>
                    <td className={`tableDataFeature ${selectedPlan === 'Premium' ? 'text-[#E50914]' : 'text-[gray]'}`}>Best</td>
                </tr>

                <tr className="tableRow">
                    <td className="tableDataTitle">Resolution</td>
                    <td className={`tableDataFeature ${selectedPlan === 'Basic' ? 'text-[#E50914]' : 'text-[gray]'}`}>480p</td>
                    <td className={`tableDataFeature ${selectedPlan === 'Standard' ? 'text-[#E50914]' : 'text-[gray]'}`}>1080p</td>
                    <td className={`tableDataFeature ${selectedPlan === 'Premium' ? 'text-[#E50914]' : 'text-[gray]'}`}>4K+HDR</td>
                </tr>

                <tr className="tableRow">
                    <td className="tableDataTitle">Wath on your TV, computer, mobile phone and tablet</td>
                    <td className={`tableDataFeature ${selectedPlan === 'Basic' ? 'text-[#E50914]' : 'text-[gray]'}`}>
                        <CheckIcon className="inline-block w-8 h-8" />
                    </td>
                    <td className={`tableDataFeature ${selectedPlan === 'Standard' ? 'text-[#E50914]' : 'text-[gray]'}`}>
                        <CheckIcon className="inline-block w-8 h-8" />
                    </td>
                    <td className={`tableDataFeature ${selectedPlan === 'Premium' ? 'text-[#E50914]' : 'text-[gray]'}`}>
                        <CheckIcon className="inline-block w-8 h-8" />
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Table