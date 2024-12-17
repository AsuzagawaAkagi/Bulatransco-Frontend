import { actions } from "astro:actions";

export const InspectorTripControl = ({ tripId, tripStatus }: { tripId: string, tripStatus: "not_started" | "in_progress" | "completed" }) => {

    const handleStartTrip = async () => {
        ("Start Trip");

        try {
            await actions.startTrip({
                tripId: tripId,
            });

            location.reload();
        } catch (e) {
            console.error(e);
        }
    };

    const handleEndTrip = async () => {
        try {
            await actions.endTrip({
                tripId: tripId,
            });

            location.reload();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="border-4 border-black bg-white p-4 md:p-6">
            <h2 className="scroll-m-20 text-2xl md:text-3xl font-bold tracking-tight uppercase border-b-4 border-black pb-2">
                Trip Control
            </h2>
            <div className="mt-4 flex flex-col space-y-4">
                <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 border-2 border-black">
                    <div className="text-lg font-semibold mb-2">
                        Current Status: {tripStatus.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
                    </div>
                    {tripStatus === "not_started" ? (
                        <div className="flex flex-col items-center gap-2">
                            <button
                                className="bg-blue-500 text-white px-8 py-3 text-base rounded-md hover:bg-blue-600 transition-colors duration-300 font-semibold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none w-full"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (confirm("Are you sure you want to start this trip?")) {
                                        handleStartTrip();
                                    }
                                }}
                            >
                                Start Trip
                            </button>
                            <p className="text-sm text-gray-600">Click to begin the journey</p>
                        </div>
                    ) : tripStatus === "in_progress" ? (
                        <div className="flex flex-col items-center gap-2">
                            <button
                                className="bg-red-500 text-white px-8 py-3 text-base rounded-md hover:bg-red-600 transition-colors duration-300 font-semibold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none w-full"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (confirm("Are you sure you want to end this trip? This action cannot be undone.")) {
                                        handleEndTrip();
                                    }
                                }}
                            >
                                End Trip
                            </button>
                            <p className="text-sm text-gray-600">Click to complete the journey</p>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-green-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="font-medium">Trip Successfully Completed</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
