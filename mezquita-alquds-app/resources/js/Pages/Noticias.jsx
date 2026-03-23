import MainLayout from '../Layouts/MainLayout';

export default function Noticias() {
    return (
        <MainLayout title="Noticias">
            <section className="pt-28 pb-16 max-w-7xl mx-auto px-6">
                <h1 className="text-3xl font-bold text-[#0F5132] mb-4">Noticias de la mezquita</h1>
                <p className="text-gray-600 mb-8">Aquí aparecerán las noticias y comunicados publicados por el imam.</p>
                <div className="p-6 bg-[#F8F8F8] border border-[#C9A227]/20 rounded-2xl text-gray-500 text-sm">
                    Módulo de noticias en construcción.
                </div>
            </section>
        </MainLayout>
    );
}