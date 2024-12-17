import { actions } from "astro:actions";
import { AddPersonelComponent } from "./AddConductorComponent";

interface Personnel {
    id: string;
    name: string;
}

interface Location {
    id: string;
    name: string;
}

const PersonnelSelect = ({
    label,
    name,
    items
}: {
    label: string;
    name: string;
    items: Personnel[]
}) => (
    <div className="flex flex-col gap-2">
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
            {label}
            {items.length === 0 ? (
                <div className="mt-1 border-2 border-dashed border-gray-300 px-4 py-3 bg-gray-50 text-gray-500 rounded-lg text-center">
                    No {label.toLowerCase()} available
                </div>
            ) : (
                <select
                    name={name}
                    className="mt-1 block w-full rounded-lg border-2 border-gray-300 px-4 py-2.5 
                    bg-white shadow-sm transition-colors hover:border-gray-400 focus:border-blue-500 
                    focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                >
                    <option value="" disabled selected>Select {label}</option>
                    {items.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            )}
        </label>
    </div>
);

export const AddTripsComponent = ({ locations, conductors, inspectors }: { locations: Location[], conductors: Personnel[], inspectors: Personnel[] }) => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        try {
            const { data, error } = await actions.addTrips(formData);
            if (error) {
                console.error(error);
            }
            alert("Trips added successfully");
            location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6">
                <AddPersonelComponent />

                <form
                    onSubmit={handleSubmit}
                    method="post"
                    className="mt-6 space-y-6 border-4 border-gray-200 rounded-xl p-6 bg-gray-50/50"
                >
                    <div className="grid gap-6 md:grid-cols-2">
                        <PersonnelSelect label="Inspector" name="inspectorId" items={inspectors} />
                        <PersonnelSelect label="Conductor" name="conductorId" items={conductors} />
                    </div>
                    
                    <PersonnelSelect label="Location" name="locationId" items={locations} />

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="date" className="text-sm font-medium text-gray-700">
                                Date
                                <input
                                    type="date"
                                    name="date"
                                    required
                                    className="mt-1 block w-full rounded-lg border-2 border-gray-300 px-4 py-2.5 
                                    bg-white shadow-sm transition-colors hover:border-gray-400 
                                    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                                />
                            </label>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="totalPassengers" className="text-sm font-medium text-gray-700">
                                Total Passengers
                                <input
                                    type="number"
                                    name="totalPassengers"
                                    required
                                    min="0"
                                    className="mt-1 block w-full rounded-lg border-2 border-gray-300 px-4 py-2.5 
                                    bg-white shadow-sm transition-colors hover:border-gray-400 
                                    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                                />
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!locations.length || !conductors.length || !inspectors.length}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 w-full font-sans transition-colors rounded-lg mt-8 text-sm"
                    >
                        {!locations.length || !conductors.length || !inspectors.length ? 
                            'Missing Required Personnel' : 'ADD TRIP'}
                    </button>
                </form>
            </div>
        </div>
    );
};