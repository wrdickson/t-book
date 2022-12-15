import account from './modules/account.js'
import engine from './modules/engine.js'
import rootSpaces from './modules/rootSpaces.js'
import reservations from './modules/reservations.js'
import customers from './modules/customers.js'
import spaceTypes from './modules/spaceTypes.js'
import taxTypes from './modules/apiTaxTypes.js'
import saleTypes from './modules/apiSaleTypes.js'
import saleTypeGroups from './modules/apiSaleTypeGroups.js'
import paymentTypes from './modules/apiPaymentTypes.js'
import payments from './modules/apiPayments.js'
import folios from './modules/apiFolios.js'

const api = {
  account: account,
  customers: customers,
  engine: engine,
  rootSpaces: rootSpaces,
  reservations: reservations,
  spaceTypes: spaceTypes,
  taxTypes: taxTypes,
  saleTypes: saleTypes,
  saleTypeGroups: saleTypeGroups,
  paymentTypes: paymentTypes,
  payments: payments,
  folios: folios
}

export default api
