import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

function App() {
  const [carnes, setCarnes] = useState([]);
  
  
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const tarjetasRef = useRef([]);

  useEffect(() => {
    
    fetch('http://localhost:8080/api/ventas/ver-disponibilidad')
      .then(response => response.json())
      .then(data => setCarnes(data))
      .catch(error => console.error("Error de red:", error));

   
    gsap.fromTo(headerRef.current, 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

   
    gsap.fromTo(titleRef.current, 
      { opacity: 0, x: -30 }, 
      { opacity: 1, x: 0, duration: 1, delay: 0.3, ease: "power2.out" }
    );
  }, []);

  
  useEffect(() => {
    if (carnes.length > 0) {
      gsap.fromTo(tarjetasRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [carnes]);

  return (
  
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-red-800 selection:text-white pb-12">
      
    
      <header ref={headerRef} className="bg-white border-b border-stone-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-red-800 text-white p-2 rounded-lg shadow-md">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-stone-900">
              Carnicería<span className="font-light text-red-800">  "El del Sombrero"</span>
            </h1>
          </div>
          
        
          <button className="text-stone-400 hover:text-red-800 transition-colors">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z"></path></svg>
          </button>
        </div>
      </header>

      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
       
        <div ref={titleRef} className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900">Catálogo de Carnes</h2>
          <p className="mt-2 text-lg text-stone-500">Calidad de exportación, Carne de Gran Calidad</p>
        </div>

      
        {carnes.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-800"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {carnes.map((corte, index) => (
              <article 
                key={corte.id} 
                ref={el => tarjetasRef.current[index] = el}
                className="bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
              >
               
                <div className="h-40 bg-stone-100 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-200 to-transparent opacity-50"></div>
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-500">🥩</span>
                  <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-md shadow-sm border border-stone-100">
                    <span className="text-xs font-bold text-green-600">En Stock</span>
                  </div>
                </div>

              
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-stone-900 leading-tight mb-2 group-hover:text-red-800 transition-colors">
                      {corte.nombreCorte}
                    </h3>
                    <p className="text-sm text-stone-500 mb-4">
                      Inventario disponible: <span className="font-semibold text-stone-700">{corte.kilosDisponibles} kg</span>
                    </p>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-stone-100">
                    <div className="flex justify-between items-end mb-4">
                      <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">Precio p/Kilo</span>
                      <span className="text-2xl font-black text-stone-900">${corte.precioPorKilo}</span>
                    </div>
                    
                   
                    <button className="w-full bg-stone-900 hover:bg-red-800 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;