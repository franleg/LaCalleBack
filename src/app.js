import express from "express";
import cors from 'cors';
import passport from "passport";
import initializePassport from './config/passport.config.js';
import cookieParser from "cookie-parser";
import BookingsRouter from './routes/bookings.router.js';
import SessionsRouter from './routes/sessions.router.js';
import AvailabilityRouter from './routes/availability.router.js'
import PromotionsRouter from './routes/promotions.router.js';
import UsersRouter from './routes/users.router.js';
import NotificationsRouter from './routes/notifications.router.js';
import config from "./config/config.js";
import mercadopago from "mercadopago";
import fetch from "node-fetch";

const app = express();

const PORT = config.app.PORT;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(cookieParser());

initializePassport();
app.use(passport.initialize());

app.use('/api/booking', BookingsRouter);
app.use('/api/sessions', SessionsRouter);
app.use('/api/availability', AvailabilityRouter);
app.use('/api/promotions', PromotionsRouter);
app.use('/api/users', UsersRouter);
app.use('/api/notifications', NotificationsRouter);


// mercadopago.configure({
//     access_token: config.mercadoPago.access_token
//   });

// // Función para obtener los pagos asociados a la orden del comerciante
// const getPaymentsForMerchantOrder = async(externalReference) => {
//     try {
//       // Filtrar los pagos por referencia externa (external_reference)
//       const filters = {
//         external_reference: externalReference,
//       };
  
//       // Obtener los pagos con el filtro
//       const response = await mercadopago.payment.search(filters);
  
//       return response.body.results;
//     } catch (error) {
//       console.error('Error al obtener los pagos asociados:', error);
//       return [];
//     }
// }

// app.post('/mercadopago', async (req, res) => {
//     const notification = req.body;
//     console.log('Received notification:', notification);
//     const { query } = req;
//     const topic = query.topic || query.type;
//     const id = query.id;
//     let merchant_order = null;

//     // Declara la constante merchantOrderURL aquí
//     let merchantOrderURL;

//     try {
//         switch (topic) {
//             case "payment":
//                 const payment = await mercadopago.payment.findById(id);
//                 console.log('Información del pago:', payment.body);

//                 // Asigna el valor de la URL de la merchant_order a merchantOrderURL
//                 merchantOrderURL = notification.resource;
//                 break;
//             case "merchant_order":
//                 // Asigna el valor de la URL de la merchant_order a merchantOrderURL
//                 merchantOrderURL = notification.resource;
//                 console.log(merchantOrderURL);
//                 break;
//             default:
//                 console.log('El topic recibido no es válido.');
//         }

//         // Extrae el ID de la merchant_order desde la URL
//         const merchantOrderId = merchantOrderURL.split('/').pop();
//         console.log(merchantOrderId);
//         // Obtenemos la información de la merchant_order
//         merchant_order = await mercadopago.merchant_orders.findById(merchantOrderId);
//         console.log('Información de la orden del comerciante:', merchant_order.body);

//     } catch (error) {
//         console.error('Error al consultar la API de MercadoPago:', error);
//     }

//     // if (merchant_order) {
//     //     console.log('Información del merchant_order:', merchant_order.body);
    
//     //     // Verifica los pagos asociados al merchant_order
//     //     const payments = await getPaymentsForMerchantOrder(merchant_order.body.external_reference);
//     //     console.log('Pagos asociados al merchant_order:', payments);
    
//     //     // Realiza las acciones necesarias según los pagos asociados
//     //     // Aquí puedes implementar la lógica para confirmar el pago, liberar los artículos, etc.
//     // } else {
//     //     console.log('No se pudo obtener la información del merchant_order.');
//     // }

//     res.sendStatus(200);
// });

  
// //mercadopago.merchant_orders.findById('10635242897').then(res => console.log(res.body))
// //mercadopago.payment.findById('1313999458').then(res => console.log(res.body))

mercadopago.configure({
    access_token: 'TEST-2184574495365681-072418-acf3a592a00d248bf090ae5cbeeaee79-1431581311'
  });

app.get('/generate', (req, res) => {
  let preference = {
    back_urls: {
      success: 'http://localhost:8081/success'
    },
    items: [
      {
        id: 123,
        title: 'Mi producto',
        unit_price: 100,
        currency_id: 'ARS',
        quantity: 1
      }
    ],
    notification_url: 'https://b890-152-168-155-111.ngrok-free.app/notificate'
  };

  mercadopago.preferences
    .create(preference)
    .then((response) => {
      console.log(response.body.init_point);
      res.send(`<a href="${response.body.init_point}">IR A PAGAR</a>`);
    })
    .catch((error) => {
      console.log(error);
    })
});

app.get('/success', (req, res) => {
  res.send('TODO OK!');
});

app.post('/notificate', async(req, res) => {
    const notification = req.body;
    console.log('Received notification:', notification);
    const { query } = req;
    const topic = query.topic || query.type;
    const id = query.id;
    let merchant_order = null;
    let merchantOrderURL;

    try {
        switch (topic) {
            case "payment":
                const payment = await mercadopago.payment.findById(id);
                console.log('Información del pago:', payment.body);

                // Asigna el valor de la URL de la merchant_order a merchantOrderURL
                merchantOrderURL = notification.resource;
                console.log('merchantOrderURL:', merchantOrderURL);
                break;
            case "merchant_order":
                // Asigna el valor de la URL de la merchant_order a merchantOrderURL
                merchantOrderURL = notification.resource;
                console.log('merchantOrderURL:', merchantOrderURL);
                break;
            default:
                console.log('El topic recibido no es válido.');
        }

        // Extrae el ID de la merchant_order desde la URL
        let merchantOrderId = merchantOrderURL.split('/').pop();
        console.log('merchantOrderId:', merchantOrderId);

        // Obtenemos la información de la merchant_order
        merchant_order = await mercadopago.merchant_orders.findById(merchantOrderId);
        console.log('Información de la orden del comerciante:', merchant_order.body);

    } catch (error) {
        console.error('Error al consultar la API de MercadoPago:', error);
    }
  res.sendStatus(200);
});

//mercadopago.merchant_orders.findById('10644832245').then(resp => console.log(resp));

const getMerchantOrder = async () => {
  try {
    const response = await fetch(`https://api.mercadopago.com/merchant_orders/10693975712`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer TEST-2184574495365681-072418-acf3a592a00d248bf090ae5cbeeaee79-1431581311`,
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log('Información de la orden del comerciante:', data);
  } catch (error) {
    console.error('Error al consultar la API de MercadoPago:', error.message);
  }
};

getMerchantOrder();
