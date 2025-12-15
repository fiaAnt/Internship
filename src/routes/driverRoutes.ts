import { Router } from 'express'
import { getDriver, createDriver } from '../controllers/driverController'

const router = Router()

router.get('/:id', getDriver)
router.post('/', createDriver)

export default router