import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import QuestionController from '../controllers/questionController';
import UserController from '../controllers/userController';
import CategoryController from '../controllers/categoryController';
import AuthController from '../controllers/authController';
const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
};

const router = Router();

// Auth routes
router.post('/auth/signup', AuthController.signup);
router.post('/auth/login', AuthController.login);

// Question routes
router.get('/question/all', QuestionController.all);
router.delete('/question/deleteall', QuestionController.deleteAll);
router.post('/question/add', QuestionController.add);
router.post('/question/answer', QuestionController.answer);
router.put('/question/edit', QuestionController.edit);
router.put('/question/addcategory', QuestionController.addCategory);
router.get('/question/random', QuestionController.random);

// User routes
router.get('/user/:id', UserController.get);
router.get('/user/all', UserController.all);
router.get('/user/top10', UserController.top10);

// Category routes
router.get('/category/all', CategoryController.all);
router.get('/category/:name', CategoryController.get);
router.post('/category/add', CategoryController.add);
router.delete('/category/delete', CategoryController.deleteCategory);

/*
 // Dev routes
if (process.env.NODE_ENV === 'development') {
  router.use('/dev/api-docs', swaggerUi.serve);
  router.get('/dev/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions));
}
 */
export default router;
