const express = require('express');
const router = express.Router();

// Import controllers
const testimonialController = require('../controllers/testimonialController');
const featureController = require('../controllers/featureController');
const planController = require('../controllers/planController');
const faqController = require('../controllers/faqController');
const blogController = require('../controllers/blogController');
const mediaController = require('../controllers/mediaController');

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

// FAQ routes - REORDERED for proper routing
// Place specific routes first, generic ID route last
router.route('/faqs/published')
  .get(faqController.getPublishedFaqs);

router.route('/faqs/category/:category')
  .get(faqController.getFaqsByCategory);

router.route('/faqs')
  .get(faqController.getAllFaqs)
  .post(faqController.createFaq);

router.route('/faqs/:id')
  .get(faqController.getFaqById)
  .put(faqController.updateFaq)
  .delete(faqController.deleteFaq);

// Blog routes
router.route('/blogs/published')
  .get(blogController.getPublishedBlogs);

router.route('/blogs/slug/:slug')
  .get(blogController.getBlogBySlug);

router.route('/blogs/upload-image')
  .post(blogController.uploadImage);

router.route('/blogs')
  .get(blogController.getAllBlogs)
  .post(blogController.createBlog);

router.route('/blogs/:id')
  .get(blogController.getBlogById)
  .put(blogController.updateBlog)
  .delete(blogController.deleteBlog);

// Media routes
router.route('/media/counts')
  .get(mediaController.getMediaCounts);

router.route('/media/batch-delete')
  .post(mediaController.batchDeleteMedia);

router.route('/media')
  .get(mediaController.getAllMedia);

router.route('/media/:id')
  .delete(mediaController.deleteMedia);

module.exports = router; 