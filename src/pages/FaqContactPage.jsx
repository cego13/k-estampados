import React, { useState } from 'react';
import { ChevronDown, MessageCircle, Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { FAQS, WHATSAPP_PHONE } from '../data/productsData';

export default function FaqContactPage() {
  const [openIndex, setOpenIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    quantity: '1',
    message: ''
  });

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitQuote = (e) => {
    e.preventDefault();

    const msgText = 
`*CK ESTAMPADOS - SOLICITUD DE COTIZACION*

*Nombre:* ${formData.name || 'Cliente'}
*Telefono:* ${formData.phone || 'No especificado'}
*Ciudad / Municipio:* ${formData.city || 'Colombia'}
*Cantidad estimada:* ${formData.quantity} unidad(es)
*Detalles del pedido:* ${formData.message || 'Quiero informacion sobre estampados DTF en sus telas disponibles.'}

Solicito confirmacion de precios, disponibilidad y tiempos de entrega.`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msgText)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="pt-28 pb-20 bg-[#f8f8f8] text-[#111111] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
            Atención Directa & Preguntas Frecuentes
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            ¿Cómo Podemos Ayudarte?
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Resolvemos tus dudas sobre confección, tiempos de entrega y garantía. Escríbenos directamente o solicita una cotización en minutos.
          </p>
        </div>

        {/* Grid de 2 Columnas: FAQ y Formulario WhatsApp */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* COLUMNA IZQUIERDA: ACORDEÓN DE PREGUNTAS FRECUENTES */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-blue-600" />
              <span>Preguntas Frecuentes</span>
            </h2>

            <div className="space-y-3">
              {FAQS.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-blue-600 shrink-0 transition-transform duration-300 ${
                          isOpen ? 'transform rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-fadeIn">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* COLUMNA DERECHA: FORMULARIO DE COTIZACIÓN RÁPIDA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  Cotización Inmediata
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  Solicita tu Pedido por WhatsApp
                </h3>
                <p className="text-xs text-slate-500">
                  Diligencia los datos y te atenderemos en minutos en nuestro canal oficial.
                </p>
              </div>

              <form onSubmit={handleSubmitQuote} className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ej. Juan Pérez"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">WhatsApp *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="318 000 0000"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Ciudad *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Ej. Medellín"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Cantidad de Camisetas</label>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Detalles del Diseño o Telas</label>
                  <textarea
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe qué deseas estampar, colores o tallas..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-extrabold text-xs text-white bg-blue-600 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar Cotización a WhatsApp (+57 318 624 1724)</span>
                </button>
              </form>
            </div>

            {/* Canales de Contacto Directo */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-3 text-xs">
              <div className="flex items-center gap-3 text-slate-700">
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-mono font-bold">+57 318 624 1724</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Lunes a Sábado: 8:00 AM – 7:00 PM</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Despachos asegurados a toda Colombia</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
