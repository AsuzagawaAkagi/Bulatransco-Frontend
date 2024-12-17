import { actions } from "astro:actions";


export const InspectorRequestControl = ({ tripId, requests }: { tripId: string, requests: any[] }) => {

    const handleApprove = async (requestId: number, action: "approve" | "reject") => {

        if (confirm("Are you sure you want to approve this request?")) {
            try {
                await actions.approveRequest({
                    tripId: tripId,
                    requestId: requestId,
                    action: action,
            });

                location.reload();
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <div className="border-4 border-black bg-white p-4 md:p-6">
            <h2 className="scroll-m-20 text-2xl md:text-3xl font-bold tracking-tight uppercase border-b-4 border-black pb-2">
                Passenger Count Requests
            </h2>
            <div className="mt-4 overflow-x-auto">
                <div className="max-h-[400px] overflow-y-auto">
                    <table className="w-full border-4 border-black">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border-2 border-black p-3 text-left font-mono font-bold">Request ID</th>
                                <th className="border-2 border-black p-3 text-left font-mono font-bold">Request Value</th>
                                <th className="border-2 border-black p-3 text-left font-mono font-bold">Status</th>
                                <th className="border-2 border-black p-3 text-left font-mono font-bold">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...requests]
                                .sort((a, b) => {
                                    // First sort by pending status
                                    if (a.requestStatus === "pending" && b.requestStatus !== "pending") return -1;
                                    if (a.requestStatus !== "pending" && b.requestStatus === "pending") return 1;
                                    // Then sort by ID
                                    return a.id - b.id;
                                })
                                .map((request) => (
                                    <tr key={request.id} className="border-b-2 border-black hover:bg-gray-50">
                                        <td className="border-2 border-black p-3 font-mono">{request.id}</td>
                                        <td className="border-2 border-black p-3 font-mono">{request.requestValue}</td>
                                        <td className="border-2 border-black p-3 font-mono">
                                            <span className={
                                                request.requestStatus === "pending" 
                                                    ? "text-yellow-600 font-semibold"
                                                    : request.requestStatus === "approved"
                                                        ? "text-green-600 font-semibold" 
                                                        : "text-red-600 font-semibold"
                                            }>
                                                {request.requestStatus.charAt(0).toUpperCase() + request.requestStatus.slice(1)}
                                            </span>
                                        </td>
                                        <td className="border-2 border-black p-3 font-mono">
                                            {request.requestStatus === "pending" && (
                                                <>
                                                    <button className="bg-blue-500 mr-2 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300" onClick={() => handleApprove(request.id, "approve")}>
                                                        Approve
                                                    </button>
                                                    <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300" onClick={() => handleApprove(request.id, "reject")}>
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}