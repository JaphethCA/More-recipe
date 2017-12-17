import express from 'express';

import apiV1 from './v1';
import auth from '../middlewares/authenticator';


const apiRouter = express.Router();

apiRouter.use(auth.authenticate);
apiRouter.use(apiV1);
apiRouter.use('/v1', auth.authenticate, apiV1);

export default apiRouter;
