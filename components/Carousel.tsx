'use client'

import { useRef } from 'react';
import { ChevronLeft, ChevronRight, CirclePlus } from 'lucide-react'; // Opcional: biblioteca de ícones

interface ICardProperties {
    id: number,
    title: string,
    subtitle: string
}

const Card = ({ id, subtitle, title }: ICardProperties) => (
    <div className="min-w-70 md:min-w-100 h-64 bg-linear-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl flex flex-col justify-end p-6 snap-center border border-slate-700 transition-transform hover:scale-[1.02]">
        <span className="text-yellow-400 font-mono text-sm">{title}</span>
        <h3 className="text-white text-xl font-bold">{title}</h3>
        <button className='flex gap-4 my-4 bg-yellow-500 w-fit px-3 py-1.5 rounded-md'><CirclePlus/> Ver mais</button>
    </div>
);

export function EnhancedCarousel() {
    const carouselRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (carouselRef.current) {
            const { scrollLeft, clientWidth } = carouselRef.current;

            // Calculamos o deslocamento baseado na largura visível (80% dela para manter contexto)
            const offset = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;

            carouselRef.current.scrollTo({
                left: scrollLeft + offset,
                behavior: 'smooth',
            });
        }
    };

    //const cards = Array.from({ length: 6 }, (_, i) => i + 1);

    const cards = [
        {
            id: 1,
            title: 'Fabricação de peças originais',
            subtitle: 'Produção de componentes de alta performance com rigor técnico e fidelidade total às especificações de fábrica.'
        },
        {
            id: 2,
            title: 'Prestação de serviço técnico especializado',
            subtitle: 'Consultoria e execução por engenheiros experientes para soluções complexas em todo o ciclo industrial.'
        },
        {
            id: 3,
            title: 'Manutenção de equipamento especializado',
            subtitle: 'Intervenções preditivas e corretivas em ativos críticos, garantindo máxima disponibilidade operacional.'
        },
        {
            id: 4,
            title: 'Tropicalização de projetos (Nacionalização) equipamento completo',
            subtitle: 'Adaptação completa de projetos estrangeiros às normas brasileiras (NRs) e condições locais de operação.'
        },
        {
            id: 5,
            title: 'Nacionalização das peças',
            subtitle: 'Desenvolvimento local de itens importados com a mesma qualidade técnica, reduzindo custos e prazos.'
        },
        {
            id: 6,
            title: 'Montagem e Supervisão',
            subtitle: 'Gestão técnica e operacional na instalação de máquinas, assegurando um start-up preciso e seguro.'
        },
        {
            id: 7,
            title: 'Peças sobressalientes',
            subtitle: 'Fornecimento ágil de itens de reposição crítica para evitar paradas não planejadas na sua linha.'
        }
    ]

    return (
        <div className="w-full max-w-7xl mx-auto py-12 px-6 group">
            <div className="flex justify-center mb-8 w-full">
                <div className='flex flex-col justify-center items-center'>
                    <h3 className="text-base font-semibold leading-7 text-yellow-600">Nossos serviços</h3>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-50">Entre em contato conosco por e-mail ou WhatsApp</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">Preencha os campos abaixo para que possamos te conhecer melhor e entender a demanda da sua empresa.</p>
                </div>
            </div>

            {/* Container de Scroll */}
            <div
                ref={carouselRef}
                className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory scroll-smooth"
            >
                {cards.map((card) => (
                    <Card key={card.id} id={card.id} title={card.title} subtitle={card.subtitle} />
                ))}
            </div>
            <div className="flex gap-2 justify-between">
                <button
                    onClick={() => scroll('left')}
                    className="p-1 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 active:scale-95 transition-all"
                    aria-label="Anterior"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={() => scroll('right')}
                    className="p-1 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 active:scale-95 transition-all"
                    aria-label="Próximo"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
}