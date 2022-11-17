import account from './modules/account.js'
import engine from './modules/engine.js'
import rootSpaces from './modules/rootSpaces.js'
import reservations from './modules/reservations.js'
import customers from './modules/customers.js'

const api = {
  account: account,
  customers: customers,
  engine: engine,
  rootSpaces: rootSpaces,
  reservations: reservations,
}

export default api
