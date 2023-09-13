import mercadopago from "mercadopago";
import axios from "axios";

const accessToken = 'TEST-2184574495365681-072418-acf3a592a00d248bf090ae5cbeeaee79-1431581311';

mercadopago.configurations.setAccessToken(`${accessToken}`);

let pendingReservationData;

const createPreference = async (req, res) => {
  try {
    const preferenceData = { items: req.body.items };
    const preference = await mercadopago.preferences.create(preferenceData);
    const preferenceURL = preference.body.init_point;
    const preferenceId = preference.body.id;

    pendingReservationData = req.body.reservation;

    req.preferenceId = preferenceId;
    res.json({ preference_id: preferenceId, preference_url: preferenceURL });
  } catch (error) {
    console.error('Error al crear la preferencia:', error.message);
    res.status(500).json({ error: 'Error al crear la preferencia' });
  }
};

const verifyPayment = async (req, res, next) => {
  try {
    const notificationData = req.body;

    switch (notificationData.type) {
      case 'payment':
        console.log('Evento de pago recibido:', notificationData);
        const paymentId = notificationData.data.id;
        const response = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const paymentInfo = response.data;
        if (paymentInfo.status === 'approved') {
          console.log('El pago ha sido aprobado. ID del pago:', paymentInfo.id);
          req.paymentApproved = true;
          req.pendingReservationData = pendingReservationData;
        }
        break;
      default:
        console.log('Evento no procesado:', notificationData);
    }
    next();
  } catch (error) {
    console.error('Error al procesar la notificación:', error.message);
    res.status(500).send('Error al procesar la notificación.');
  }
};

export default {
  createPreference,
  verifyPayment,
};