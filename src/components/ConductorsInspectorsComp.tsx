import { actions } from "astro:actions";
import { useState, type FormEvent } from "react";

type Conductor = {
    id: string;
    name: string;
    relatedTrips: { tripStatus: "not_started" | "in_progress" | "completed" }[];
};

type Inspector = {
    id: string;
    name: string;
    relatedTrips: { tripStatus: "not_started" | "in_progress" | "completed" }[];
};

export const ConductorsInspectorsComp = ({ conductors, inspectors }: { conductors: Conductor[], inspectors: Inspector[] }) => {
    const [activeTab, setActiveTab] = useState<'conductors' | 'inspectors'>('conductors');

    const handleDelete = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!confirm('Are you sure you want to delete this person?')) {
            return;
        }

        const formData = new FormData(e.target as HTMLFormElement);


        const res = await actions.deletePersonel(formData);

        if (res.data?.success) {
            location.reload();
        }
    };

    const TableHeader = () => (
        <tr>
            <th className="border-2 border-black px-4 py-2 text-left font-mono bg-gray-100">ID</th>
            <th className="border-2 border-black px-4 py-2 text-left font-mono bg-gray-100">NAME</th>
            <th className="border-2 border-black px-4 py-2 font-mono bg-gray-100">STATUS</th>
            <th className="border-2 border-black px-4 py-2 font-mono bg-gray-100">OPTIONS</th>
        </tr>
    );

    const TableRow = ({ id, name, relatedTrips }: { id: string, name: string, relatedTrips: { tripStatus: "not_started" | "in_progress" | "completed" }[] }) => (
        <tr>
            <td className="border-2 border-black px-6 py-3 font-mono">{id}</td>
            <td className="border-2 border-black px-6 py-3 font-mono">{name}</td>
            <td className="border-2 border-black px-2 py-1 font-mono">
                {relatedTrips.filter(trip => trip.tripStatus === 'in_progress').length ? "ACTIVE" : "INACTIVE"}
            </td>
            <td className="border-2 border-black px-2 py-1 font-mono">
                <form onSubmit={handleDelete}>
                    <input type="hidden" name="userId" value={id} />
                    <input type="hidden" name="type" value={activeTab === 'conductors' ? 'conductor' : 'inspector'} />
                    <button type="submit" className="hover:underline">DELETE</button>
                </form>
            </td>
        </tr>
    );

    const DataTable = ({ data }: { data: Array<Conductor | Inspector> }) => (
        <div className="max-h-[250px] overflow-y-auto">
            <table className="w-full border-4 border-black">
                <thead>
                    <TableHeader />
                </thead>
                <tbody>
                    {data.map(item => (
                        <TableRow key={item.id} {...item} />
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="border-4 border-black bg-white p-6">
            <div className="flex gap-4 border-b border-black">
                <button
                    onClick={() => setActiveTab('conductors')}
                    className={`pb-2 text-2xl font-semibold tracking-tight transition-colors ${activeTab === 'conductors'
                        ? 'border-b-4 border-black'
                        : 'text-gray-500 hover:text-black'
                        }`}
                >
                    Conductors
                </button>
                <button
                    onClick={() => setActiveTab('inspectors')}
                    className={`pb-2 text-2xl font-semibold tracking-tight transition-colors ${activeTab === 'inspectors'
                        ? 'border-b-4 border-black'
                        : 'text-gray-500 hover:text-black'
                        }`}
                >
                    Inspectors
                </button>
            </div>
            <div className="mt-4">
                {activeTab === 'conductors' ? (
                    <DataTable data={conductors} />
                ) : (
                    <DataTable data={inspectors} />
                )}
            </div>
        </div>
    );
};
