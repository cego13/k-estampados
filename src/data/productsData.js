import algodonNegro from '../assets/telas/algodon_negro.jpeg';
import algodonBlanco from '../assets/telas/algodon_blanco.jpeg';
import telaFriaNegro from '../assets/telas/tela_fria_negro.jpeg';
import telaFriaBlanco from '../assets/telas/tela_fria_blanco.jpeg';
import oversizeNegro from '../assets/telas/oversize_negro.png';
import oversizeBlanco from '../assets/telas/oversize_blacno.png';

export const WHATSAPP_PHONE = "573186241724";
export const INSTAGRAM_URL = "https://www.instagram.com/ck.estampados?utm_source=qr&igsi=ejl2bHdpcW15eGI=";

export const FABRIC_TYPES = [
  {
    id: 'tela-algodon',
    name: 'Camiseta Tela Algodón',
    subtitle: 'Elasticidad, Confort y Suavidad',
    description: 'Confeccionada con 33% algodón, 62% poliéster y 5% spandex con un gramaje de 195 gr. Brinda excelente caída, ajuste cómodo y gran elasticidad para el uso diario.',
    composition: '33% Algodón, 62% Poliéster, 5% Spandex',
    features: [
      '33% Algodón, 62% Poliéster, 5% Spandex',
      'Gramaje de 195 gr',
      'Elasticidad y comodidad todo el día',
      'Fijación térmica DTF HD'
    ],
    idealFor: 'Uso casual diario, comodidad y outfits definidos.',
    basePrice: 40000,
    badge: 'Más Vendido',
    weight: '195 gr',
    image: algodonNegro,
    imageBlack: algodonNegro,
    imageWhite: algodonBlanco
  },
  {
    id: 'tela-fria',
    name: 'Camiseta Tela Fría',
    subtitle: 'Tacto Fresco, Sedoso y Transpirable',
    description: 'Confeccionada con 47% algodón, 47% rayón y 6% spandex con un gramaje de 180 gr. Brinda una sensación térmica refrescante y secado rápido.',
    composition: '47% Algodón, 47% Rayón, 6% Spandex',
    features: [
      '47% Algodón, 47% Rayón, 6% Spandex',
      'Gramaje de 180 gr',
      'Sensación térmica refrescante instantánea',
      'Secado rápido y anti-manchas de sudor'
    ],
    idealFor: 'Climas calurosos, actividades dinámicas y estilo fresco.',
    basePrice: 55000,
    badge: 'Frescura Total',
    weight: '180 gr',
    image: telaFriaNegro,
    imageBlack: telaFriaNegro,
    imageWhite: telaFriaBlanco
  },
  {
    id: 'oversize-qatar',
    name: 'Camiseta Oversize Qatar',
    subtitle: 'Corte Boxy Fit & Algodón Pesado Heavyweight',
    description: 'Confección pesada con 86% algodón, 10% poliéster y 4% spandex con un gramaje premium de 250 gr. Corte holgado en tendencia urbana con caída firme y cuello cerrado en rib.',
    composition: '86% Algodón, 10% Poliéster, 4% Spandex',
    features: [
      '86% Algodón, 10% Poliéster, 4% Spandex',
      'Gramaje pesado de 250 gr',
      'Corte Boxy Fit estructurado en tendencia',
      'Cuello en rib cerrado que no se deforma'
    ],
    idealFor: 'Streetwear, colecciones urbanas y estampados de gran formato.',
    basePrice: 70000,
    badge: 'Tendencia Top',
    weight: '250 gr',
    image: oversizeNegro,
    imageBlack: oversizeNegro,
    imageWhite: oversizeBlanco
  }
];

export const SHIRT_COLORS = [
  { id: 'negro', name: 'Negro Full', hex: '#0a0a0a', textColor: 'text-white' },
  { id: 'blanco', name: 'Blanco Full', hex: '#ffffff', textColor: 'text-slate-900' }
];

export const SIZES = ['S', 'M', 'L', 'XL'];

export const SIZE_CHARTS = {
  standard: [
    { size: 'S', width: '48 cm', length: '68 cm' },
    { size: 'M', width: '50 cm', length: '70 cm' },
    { size: 'L', width: '52 cm', length: '72 cm' },
    { size: 'XL', width: '54 cm', length: '74 cm' }
  ],
  oversize: [
    { size: 'S', width: '52 cm', length: '74 cm' },
    { size: 'M', width: '56 cm', length: '76 cm' },
    { size: 'L', width: '58 cm', length: '78 cm' },
    { size: 'XL', width: '62 cm', length: '80 cm' }
  ]
};

export const CARE_TIPS = [
  {
    icon: 'RotateCcw',
    title: 'Lavar siempre al revés',
    description: 'Voltea la prenda antes de ingresarla a la lavadora para proteger el film DTF de la fricción directa con otras prendas.'
  },
  {
    icon: 'Droplets',
    title: 'Agua fría y detergente suave',
    description: 'Usa agua a temperatura ambiente (máximo 30°C). Evita absolutamente el uso de cloro y blanqueadores agresivos.'
  },
  {
    icon: 'SunDim',
    title: 'Secado a la sombra',
    description: 'Seca la prenda tendida en un lugar fresco y a la sombra. Evita secadora caliente para prolongar la vida del estampado.'
  },
  {
    icon: 'Flame',
    title: 'No planchar directo al estampado',
    description: 'Plancha la prenda al revés o coloca papel mantequilla sobre el diseño a temperatura media sin vapor.'
  }
];

export const FAQS = [
  {
    question: '¿Qué es el estampado DTF y por qué es superior?',
    answer: 'El DTF (Direct to Film) es la tecnología de impresión digital textil más moderna. Permite estampar millones de colores, degradados y sombras con definición fotográfica nítida sobre cualquier tela y color, ofreciendo un tacto suave, elasticidad y una garantía de más de 50 lavadas sin cuartearse ni decolorarse.'
  },
  {
    question: '¿Tienen compra mínima de unidades?',
    answer: '¡No hay compra mínima! En CK Estampados producimos desde 1 sola camiseta personalizada hasta pedidos por mayor para marcas, eventos y empresas.'
  },
  {
    question: '¿Cuáles son los tiempos de producción y despacho?',
    answer: 'El tiempo de fabricación y curado térmico es de 24 a 48 horas hábiles una vez confirmado el diseño. Los envíos a toda Colombia tardan de 2 a 4 días hábiles dependiendo de tu ciudad.'
  },
  {
    question: '¿En qué formato debo enviar mi imagen o diseño?',
    answer: 'Recomendamos enviar archivos en formato PNG con fondo transparente y buena calidad. Si no cuentas con el archivo listo, nuestro diseñador te ayuda por WhatsApp a optimizarlo.'
  },
  {
    question: '¿Cómo realizo el pago y cómo envían mi pedido?',
    answer: 'Coordinamos todo directamente por nuestro WhatsApp oficial (+57 318 624 1724). Aceptamos transferencias por Nequi, Daviplata, Bancolombia y PSE. Realizamos despachos asegurados a toda Colombia.'
  }
];
