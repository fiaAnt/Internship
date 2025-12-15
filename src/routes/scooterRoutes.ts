import { Router } from 'express'
import {
    getScooters,
    getScooterBySsn,
    createScooter,
    updateScooter,
    deleteScooter,
    getScootersInUse
} from '../controllers/scooterController'

const router = Router()

router.get('/', getScooters)
router.get('/status/in-use', getScootersInUse)
router.get('/:ssn', getScooterBySsn)
router.post('/', createScooter)
router.put('/:ssn', updateScooter)
router.delete('/:ssn', deleteScooter)

export default router