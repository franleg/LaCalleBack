import mercadopago from 'mercadopago';
import config from '../config/config.js';

// Configura el access_token proporcionado por MercadoPago
mercadopago.configure({
  access_token: config.mercadoPago.access_token
});

// const getPaymentsForMerchantOrder = async (merchantOrderId) => {
//   try {
//     const searchParams = {
//       external_reference: merchantOrderId, // Usa el external_reference asociado al merchant_order
//       status: 'approved', // Solo queremos pagos aprobados
//     };

//     const payments = await mercadopago.payment.search(searchParams);
//     return payments.body.results; // Devuelve un array con los pagos encontrados
//   } catch (error) {
//     console.error("Error al obtener los pagos para el merchant_order:", error.message);
//     return [];
//   }
// };

const notificate = async (req, res) => {
  console.log('Notificación recibida:', req.body);
//   const { query } = req;
//   const topic = query.topic || query.type;
//   let merchant_order = null;

//   switch (topic) {
//     case "payment":
//       const payment = await mercadopago.payment.findById(query.id);
//       merchant_order = await mercadopago.merchant_orders.findById(payment.body.order.id);
//       break;
//     case "merchant_order":
//       merchant_order = await mercadopago.merchant_orders.findById(query.id);
//       break;
//     default:
//       console.log('El topic recibido no es válido.');
//   }

//   if (merchant_order) {
//     console.log('Información del merchant_order:', merchant_order.body);

//     // Verifica los pagos asociados al merchant_order
//     const payments = await getPaymentsForMerchantOrder(merchant_order.body.external_reference);
//     console.log('Pagos asociados al merchant_order:', payments);

//     // Realiza las acciones necesarias según los pagos asociados
//     // Aquí puedes implementar la lógica para confirmar el pago, liberar los artículos, etc.
//   } else {
//     console.log('No se pudo obtener la información del merchant_order.');
//   }

res.sendStatus(200);
  res.send();
};

export default {
  notificate
};
