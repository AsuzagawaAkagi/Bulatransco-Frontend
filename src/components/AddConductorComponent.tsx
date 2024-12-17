import { actions } from "astro:actions"
import { useState } from "react"
import { createPortal } from "react-dom"

export const AddPersonelComponent = () => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [activeTab, setActiveTab] = useState<'conductor' | 'inspector'>('conductor')

    async function handleClick() {
        const { data, error } = await actions.addPersonel({
            name: name,
            password: password,
            role: activeTab
        })  

        if (data) {
            setShowModal(false)
            setName("")
            setPassword("")
            location.reload()
        }
    }

    return (
        <div className="max-w-7xl mx-auto p-2 -mb-2">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 font-sans">Quick Actions</h1>
            </div>
            
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 w-full font-sans transition-colors rounded-lg mt-8 text-sm"
                onClick={() => setShowModal(!showModal)}
            >   
                ADD PERSONNEL
            </button>
            
            {showModal && createPortal(
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-xl shadow-2xl relative max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 font-sans">Add New Personnel</h2>
                            <button
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                onClick={() => setShowModal(false)}
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex gap-4 mb-6">
                            {['conductor', 'inspector'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as 'conductor' | 'inspector')}
                                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all font-sans
                                        ${activeTab === tab 
                                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' 
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 font-sans">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="border-2 border-gray-200 p-3 w-full font-sans rounded-md focus:border-black focus:ring-1 focus:ring-black transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 font-sans">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="border-2 border-gray-200 p-3 w-full font-sans rounded-md focus:border-black focus:ring-1 focus:ring-black transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                            <button
                                onClick={handleClick}
                                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold font-sans
                                    hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-[1.02]
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Add {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    )
}