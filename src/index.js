// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const quoteRoutes = require('./src/routes/quoteRoute');
const reviewRoutes = require('./src/routes/reviewRoute');
const serviceRoutes = require('./src/routes/serviceRoute');
const authRoutes = require('./src/routes/authRoute'); // Importar rutas de autenticación

const app = express();

app.use(express.json());

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado a la base de datos'))
.catch((error) => console.error('Error de conexión a la base de datos:', error));

// Rutas
app.use('/api/auth', authRoutes);        
app.use('/api/quotes', quoteRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/services', serviceRoutes);

// Configuración del puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
