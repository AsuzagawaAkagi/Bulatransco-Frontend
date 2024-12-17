import { useEffect, useState } from "react";
import { fetchClient } from "@/lib/client";

type Log = {
    id: number;
    locationId: string;
    logMessage: string;
    logTime: string;
    tripId: string;
}

export const UserLogComponent = ({ tripId, token }: { tripId: string, token: string }) => {
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState<Log[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchLogs = async () => {
        setLoading(true);
        const { data } = await fetchClient.get<Log[]>(`/userlogs/${tripId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setLogs(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchLogs();
    }, []);
    
    return (
        <div className="border-4 border-black bg-white p-4 md:p-6 relative">
            <button
                onClick={() => fetchLogs()}
                disabled={loading}
                className="absolute disabled:opacity-50 disabled:pointer-events-none top-4 right-4 p-2 text-sm font-medium hover:bg-gray-100 inline-flex items-center justify-center rounded-md border border-gray-200 shadow-sm transition-colors"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1"
                >
                    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5" />
                </svg>
                Refresh
            </button>
            <h2 className="scroll-m-20 text-2xl font-bold tracking-tight border-b-4 border-black pb-2">
                Trip Logs
            </h2>
            <div className="mt-4 overflow-x-auto">
                <div className="max-h-[400px] overflow-y-auto">
                    <table className="w-full border-4 border-black">
                        <thead className="sticky top-0 bg-white">
                            <tr>
                                <th className="border-2 border-black px-4 py-3 text-left font-mono bg-gray-100">
                                    Log ID
                                </th>
                                <th className="border-2 border-black px-4 py-3 text-left font-mono bg-gray-100">
                                    Description
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.length === 0 ? (
                                <tr>
                                    <td colSpan={2} className="border-2 border-black px-4 py-8 text-center font-mono text-gray-500">
                                        No logs found
                                    </td>
                                </tr>
                            ) : (
                                logs.map((log) => (
                                    <tr key={log.id}>
                                        <td className="border-2 border-black px-4 py-3 font-mono">{log.id}</td>
                                        <td className="border-2 border-black px-4 py-3 font-mono">{log.logMessage}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};
