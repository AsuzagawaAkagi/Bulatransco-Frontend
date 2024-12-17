import { actions } from "astro:actions"
import { useState, useMemo } from "react"


export const ConductorPassengerControl = ({ initialCount, tripId, tripStatus, requests }: { initialCount: number, tripId: string, tripStatus: 'not_started' | 'in_progress' | 'completed', requests: any[] }) => {

    const [passengerCount, setPassengerCount] = useState(initialCount)
    const [input, setInput] = useState(0)

    const handleChange = async ({ type, count }: { type: 'add' | 'sub', count: number }) => {
        try {
            await actions.changePassengerCount({
                type,
                count,
                tripId
            })
            location.reload()
        } catch (e) {
            console.error(e)
        }
    }


    return (
        <div className="border-4 flex-grow border-black bg-white p-6">
            <h2 className="text-3xl font-bold uppercase border-b-4 border-black pb-2">
                Current Passengers Control
            </h2>
            <div className="mt-4">
                <div className="border-2 border-black p-4 bg-gray-100">
                    <p className="font-mono text-3xl mb-4">
                        Count: {passengerCount}
                    </p>
                    {requests.some(req => req.requestStatus === "pending") ? (
                        <div className="border-2 border-yellow-500 bg-yellow-50 p-4 rounded-md">
                            <p className="text-lg font-semibold text-yellow-700">
                                Pending Request In Progress
                            </p>
                            <p className="text-sm text-yellow-600 mt-2">
                                Please wait for the inspector to approve or reject your current request before making new changes.
                            </p>
                        </div>
                    ) : tripStatus === "in_progress" ? (
                        <>
                            <input value={input} onChange={(e) => setInput(Number(e.target.value))} type="number" className="border-2 px-4 py-2 h-12 mb-4" />
                            <div className="w-full flex gap-4">
                                <button
                                    onClick={() => {
                                        if (input === 0) return;
                                        if (window.confirm(`Are you sure you want to add ${input} passengers?`)) {
                                            handleChange({ type: 'add', count: input })
                                        }
                                    }}
                                    className="mt-2 border-2 flex-grow border-black px-4 py-2 font-mono hover:bg-black hover:text-white transition-colors"
                                >
                                    + Add {input}
                                </button>
                                <button
                                    onClick={() => {
                                        if (input === 0) return;
                                        const newCount = passengerCount - input;
                                        if (newCount >= 0 && window.confirm(`Are you sure you want to subtract ${input} passengers?`)) {
                                            handleChange({ type: 'sub', count: input })
                                        } else if (newCount < 0) {
                                            alert("Passenger count cannot be negative!");
                                        }
                                    }}
                                    className="mt-2 border-2 flex-grow border-black px-4 py-2 font-mono hover:bg-black hover:text-white transition-colors"
                                >
                                    - Subtract {input}
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="text-sm text-gray-600">
                            {tripStatus === "not_started" ? "Trip still not started! Please start the trip first." : "Trip already completed!"}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}