import mercadopago from 'mercadopago';
import config from '../config/config.js';

const verifyMercadoPago = async (req, res, next) => {
  mercadopago.configure({ access_token: config.mercadoPago.access_token });
  try {
    let preference = {
      back_urls: {
        success: 'http://localhost/3000'
       },
      items: [
        {
          title: `Alquiler ${req.body.field}`,
          description: `De ${req.body.time.start} a ${req.body.time.end} hs`,
          picture_url: '',
          category_id: '',
          quantity: 1,
          currency_id: 'ARS',
          unit_price: parseInt(req.body.price)
        },
      ],
      notification_url: `https://359c-181-171-30-138.ngrok-free.app/mercadopago`
    };

    try {
      const response = await mercadopago.preferences.create(preference);
      console.log(response.body.init_point);
      res.send(response.body.init_point);
    } catch (error) {
      console.log(error);
    }

  } catch (error) {
    console.log(error);
  }
};

export default verifyMercadoPago;

// middlewares/verifyPayment.js
// import mercadopago from 'mercadopago';
// import config from '../config/config.js';

// mercadopago.configure({ access_token: config.mercadoPago.access_token });

// const verifyPayment = async (req, res, next) => {
//   try {
//     // Crea la preferencia de pago
//     const preference = {
//       external_reference: '123456789', // Utiliza una referencia única para cada reserva
//       items: [
//         {
//           title: `Alquiler ${req.body.field}`,
//           description: `De ${req.body.time.start} a ${req.body.time.end} hs`,
//           picture_url: '',
//           category_id: '',
//           quantity: 1,
//           currency_id: 'ARS',
//           unit_price: parseInt(req.body.price)
//         },
//       ],
//       notification_url: `https://359c-181-171-30-138.ngrok-free.app/api/notifications`, // Cambiar por tu URL de notificación
//     };

//     const response = await mercadopago.preferences.create(preference);
//     req.externalReference = preference.external_reference;
//     req.initPoint = response.body.init_point;
//     next();

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Error al crear la preferencia de pago' });
//   }
// };

// export default verifyPayment;