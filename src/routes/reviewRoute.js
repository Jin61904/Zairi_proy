// routes/reviews.js
const express = require('express');
const router = express.Router();
const Review = require('../models/ReviewModel');
 
// Crear una nueva reseña
router.post('/', async (req, res) => {
    try {
        const review = new Review(req.body);
        await review.save();
        res.status(201).json({ message: 'Reseña creada exitosamente', review });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear la reseña', error });
    }
});

// Obtener todas las reseñas
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find().populate('userId serviceId');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las reseñas', error });
    }
});

// Obtener una reseña por ID
router.get('/:id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.id).populate('userId serviceId');
        if (!review) return res.status(404).json({ message: 'Reseña no encontrada' });
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la reseña', error });
    }
});

// Actualizar una reseña
router.put('/:id', async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!review) return res.status(404).json({ message: 'Reseña no encontrada' });
        res.status(200).json({ message: 'Reseña actualizada exitosamente', review });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar la reseña', error });
    }
});

// Eliminar una reseña
router.delete('/:id', async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) return res.status(404).json({ message: 'Reseña no encontrada' });
        res.status(200).json({ message: 'Reseña eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la reseña', error });
    }
});

module.exports = router;
