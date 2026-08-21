import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Servir est?ticamente las previsualizaciones generadas
app.use('/previews', express.static(path.join(__dirname, '../uploads')));

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('?? Servidor API de CK Estampados activo.');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`? Backend de CK Estampados corriendo en http://localhost:${PORT}`);
});
