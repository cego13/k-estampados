import express from 'express';
import { createOrderQuote, savePreviewImage } from '../controllers/orderController.js';

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'CK Estampados API', time: new Date().toISOString() });
});

router.post('/quote', createOrderQuote);
router.post('/upload-preview', savePreviewImage);

export default router;
