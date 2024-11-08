// routes/quotes.js
const express = require('express');
const router = express.Router();
const Quote = require('../models/quoteModel');
const auth = require('../middlewares/authMiddleware');

// Crear una nueva cotización
router.post('/quote',auth ,async (req, res) => {
    try {
        const quote = new Quote(req.body);
        await quote.save();
        res.status(201).json({ message: 'Cotización creada exitosamente', quote });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear la cotización', error });
    }
});

// Obtener todas las cotizaciones
router.get('/quote', async (req, res) => {
    try {
        const quotes = await Quote.find().populate('userId serviceId');
        res.status(200).json(quotes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las cotizaciones', error });
    }
});

// Obtener una cotización por ID
router.get('/quote/:id', async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id).populate('userId serviceId');
        if (!quote) return res.status(404).json({ message: 'Cotización no encontrada' });
        res.status(200).json(quote);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la cotización', error });
    }
});

// Actualizar una cotización
router.put('/quote/:id', async (req, res) => {
    try {
        const quote = await Quote.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!quote) return res.status(404).json({ message: 'Cotización no encontrada' });
        res.status(200).json({ message: 'Cotización actualizada exitosamente', quote });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar la cotización', error });
    }
});

// Eliminar una cotización
router.delete('/quote/:id', async (req, res) => {
    try {
        const quote = await Quote.findByIdAndDelete(req.params.id);
        if (!quote) return res.status(404).json({ message: 'Cotización no encontrada' });
        res.status(200).json({ message: 'Cotización eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la cotización', error });
    }
});

module.exports = router;
