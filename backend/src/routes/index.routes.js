import { Router } from 'express';
import { __dirname } from '../path.js';

import { routerProduct } from './products.routes.js';
import { routerCarts } from './carts.routes.js';
import { routerUsers } from './user.routes.js';
import { routerSession } from './sessions.routes.js';
import { routerChat } from './chat.routes.js';
import { routerMocking } from './mocking.routes.js';
import { routerLoggerTest } from './loggerTest.routes.js';

const router = Router()


//Routes
router.use('/api/products', routerProduct);
router.use('/api/carts', routerCarts);
router.use('/api/users', routerUsers);
router.use('/api/session', routerSession);
router.use('/api/chat', routerChat);
router.use('/api/mocking', routerMocking)
router.use('/api', routerLoggerTest)


export default router;