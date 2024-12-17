import { actions } from "astro:actions"
import { useState } from "react"
import { createPortal } from "react-dom"


export const AddLocationsComponent = () => {
    const [showModal, setShowModal] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        try {
            const res = await actions.addLocation(formData)
            setShowModal(false)
            if (res.data?.success) {
                alert("Location added successfully")
                location.reload()
            } else {
                alert("Failed to add location")
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <button
                type="button"
                className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-blue-500 to-blue-600 px-3 py-1.5 
                text-sm font-semibold text-white shadow-sm hover:from-blue-600 hover:to-blue-700 transition-all"
                onClick={() => setShowModal(true)}
            >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Router 
            </button>
            {showModal && createPortal(
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all">
                        <div className="flex items-center justify-between p-6 border-b">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Add New Location
                            </h3>
                            <button
                                className="text-gray-400 hover:text-gray-500 rounded-full p-2 hover:bg-gray-100 transition-colors"
                                onClick={() => setShowModal(false)}
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form className="p-6 space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Location Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter location name"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Add Location
                                </button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}
        </div>
    )
}