import { get } from './helpers.js'

const getSeller = get('api/seller')
const getGood = get('api/good')
const getRating = get('api/rating')

export { getSeller, getGood, getRating }
