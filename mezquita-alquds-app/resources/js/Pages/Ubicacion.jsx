
import MainLayout from '../Layouts/MainLayout';

export default function Ubicacion() {
    return (
        <MainLayout title="Cómo llegar">
            <section className="pt-28 pb-16 max-w-7xl mx-auto px-6 text-center">
                <h1 className="text-3xl font-bold text-[#0F5132] mb-4">Cómo llegar</h1>
                <p className="text-gray-600 mb-8">Consulta la ubicación de la mezquita en el mapa.</p>
                <a href="https://maps.google.com"
                   className="inline-block bg-[#0F5132] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#0c3f27] transition shadow-md">
                    Abrir en Google Maps
                </a>
            </section>
        </MainLayout>
    );
}