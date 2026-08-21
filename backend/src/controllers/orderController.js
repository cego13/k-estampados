import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '../../uploads');

// Asegurar que la carpeta de uploads exista
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Guardar captura / mockup preview generado
export const savePreviewImage = (req, res) => {
  try {
    const { imageBase64 } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ success: false, message: 'No se envi? imagen' });
    }

    // Extraer datos base64
    const matches = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ success: false, message: 'Formato base64 inv?lido' });
    }

    const imageBuffer = Buffer.from(matches[2], 'base64');
    const filename = `mockup-ck-${Date.now()}-${crypto.randomBytes(4).toString('hex')}.png`;
    const filePath = path.join(uploadsDir, filename);

    fs.writeFileSync(filePath, imageBuffer);

    // Obtener host o IP
    const host = req.get('host') || 'localhost:5000';
    const protocol = req.protocol || 'http';
    const previewUrl = `${protocol}://${host}/previews/${filename}`;

    return res.status(200).json({
      success: true,
      filename,
      previewUrl
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al guardar la vista previa',
      error: error.message
    });
  }
};

// Cotizador de Pedidos
export const createOrderQuote = (req, res) => {
  try {
    const { fabric, color, size, quantity = 1, designsCount = 1, designNames = [] } = req.body;

    const priceList = {
      'licra-algodon': 48000,
      'tela-fria': 42000,
      'oversize': 58000
    };

    const basePrice = priceList[fabric] || 48000;
    // Cada estampado adicional suma $10.000 COP
    const extraPerDesign = 10000;
    const additionalStamps = Math.max(0, Number(designsCount) - 1);
    const unitPrice = basePrice + (additionalStamps * extraPerDesign);
    const subtotal = unitPrice * Number(quantity);

    const phoneNumber = "573186241724";

    return res.status(200).json({
      success: true,
      data: {
        unitPrice,
        quantity: Number(quantity),
        subtotal,
        designsCount: Number(designsCount)
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al procesar la cotizaci?n',
      error: error.message
    });
  }
};
