const express = require('express');
const router = express.Router();

// Import controllers
const testimonialController = require('../controllers/testimonialController');
const featureController = require('../controllers/featureController');
const planController = require('../controllers/planController');

// Testimonial routes
router.route('/testimonials')
  .get(testimonialController.getTestimonials)
  .post(testimonialController.createTestimonial);

router.route('/testimonials/:id')
  .get(testimonialController.getTestimonialById)
  .put(testimonialController.updateTestimonial)
  .delete(testimonialController.deleteTestimonial);

// Feature routes
router.route('/features')
  .get(featureController.getFeatures)
  .post(featureController.createFeature);

router.route('/features/:id')
  .get(featureController.getFeatureById)
  .put(featureController.updateFeature)
  .delete(featureController.deleteFeature);

// Plan routes
router.route('/plans')
  .get(planController.getPlans)
  .post(planController.createPlan);

router.route('/plans/:id')
  .get(planController.getPlanById)
  .put(planController.updatePlan)
  .delete(planController.deletePlan);

module.exports = router; 