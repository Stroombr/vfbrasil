import { useState } from 'react';

const tabs = [
    { id: 'email', label: 'Email' },
    { id: 'whatsapp', label: 'Whatsapp' },
];

export default function TabsIndustrial() {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            {/* Navegação de Abas - Responsiva (Scroll lateral no mobile) */}
            <div className="flex border-b border-yellow-500/20 overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 w-1/2 py-3 text-sm font-bold uppercase tracking-wider rounded-t-md transition-all duration-300 whitespace-nowrap border-b-2 ${activeTab === tab.id
                            ? 'border-yellow-500 text-yellow-500 bg-[#B0C4DE]/10'
                            : 'border-transparent text-yellow-800 hover:text-[#2F4F4F] hover:bg-gray-50'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Conteúdo da Aba */}
            <div className="mt-6 p-6 bg-white border border-[#B0C4DE] rounded-lg shadow-sm">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={`transition-opacity duration-500 ${activeTab === tab.id ? 'block opacity-100' : 'hidden opacity-0'
                            }`}
                    >
                        <h3 className="text-[#2F4F4F] text-xl font-bold mb-3 uppercase">
                            {tab.label}
                        </h3>
                        <div className="text-[#4682B4] leading-relaxed text-lg">
                            {tab.id == 'email' ?
                                <div>
                                    <div className='flex flex-col gap-2 py-2'>
                                        <label className='text-gray-950 text-sm' htmlFor="personName">Nome</label>
                                        <input type="text" name="personName" id="companyName" className='ring-1 ring-gray-300 rounded-md' />
                                    </div>
                                    <div className='flex flex-col gap-2 py-2'>
                                        <label className='text-gray-950 text-sm' htmlFor="companyName">Nome da Empresa</label>
                                        <input type="text" name="companyName" id="companyName" className='ring-1 ring-gray-300 rounded-md' />
                                    </div>
                                    <div className='flex flex-col gap-2 py-2'>
                                        <label className='text-gray-950 text-sm' htmlFor="email">Email para contato</label>
                                        <input type="email" name="email" id="email" className='ring-1 ring-gray-300 rounded-md' />
                                    </div>
                                    <div className='flex flex-col gap-2 py-2'>
                                        <label className='text-gray-950 text-sm' htmlFor="email">Email para contato</label>
                                        <input type="email" name="email" id="email" className='ring-1 ring-gray-300 rounded-md' />
                                    </div>
                                    <div className='flex flex-col gap-2 py-2'>
                                        <label className='text-gray-950 text-sm' htmlFor="phone">Telefone para contato</label>
                                        <input type="tel" name="phone" id="phone" className='ring-1 ring-gray-300 rounded-md' />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className='text-gray-950 text-sm' htmlFor="phone">Motivo do contato</label>
                                        <textarea name="reason" id="reason" className='ring-1 ring-gray-300 rounded-md'></textarea>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className='flex flex-col gap-2 py-2'>
                                        <label className='text-gray-950 text-sm' htmlFor="personName">Nome</label>
                                        <input type="text" name="personName" id="companyName" className='ring-1 ring-gray-300 rounded-md' />
                                    </div>
                                    <div className='flex flex-col gap-2 py-2'>
                                        <label className='text-gray-950 text-sm' htmlFor="companyName">Nome da Empresa</label>
                                        <input type="text" name="companyName" id="companyName" className='ring-1 ring-gray-300 rounded-md' />
                                    </div>
                                    <div className='flex flex-col gap-2 py-2'>
                                        <label className='text-gray-950 text-sm' htmlFor="email">Email para contato</label>
                                        <input type="email" name="email" id="email" className='ring-1 ring-gray-300 rounded-md' />
                                    </div>
                                    <div className='flex flex-col gap-2 py-2'>
                                        <label className='text-gray-950 text-sm' htmlFor="email">Email para contato</label>
                                        <input type="email" name="email" id="email" className='ring-1 ring-gray-300 rounded-md' />
                                    </div>
                                    <div className='flex flex-col gap-2 py-2'>
                                        <label className='text-gray-950 text-sm' htmlFor="phone">Telefone para contato</label>
                                        <input type="tel" name="phone" id="phone" className='ring-1 ring-gray-300 rounded-md' />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className='text-gray-950 text-sm' htmlFor="phone">Motivo do contato</label>
                                        <textarea name="reason" id="reason" className='ring-1 ring-gray-300 rounded-md'></textarea>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}