import { bookingService, promotionService } from '../services/services.js';

const getSchedules = async (req, res) => {
  try {
    const { field, date } = req.query;
    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.getDay();
    const startTime = dayOfWeek === 0 || dayOfWeek === 6 ? 15 : 16;
    const endTime = dayOfWeek === 0 || dayOfWeek === 6 ? 22 : 23;

    const selectedDay = selectedDate.toLocaleDateString('es-ES', { weekday: 'long' });
    const formattedDay = selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1);

    const promotions = await promotionService.getAll();

    const existingReservations = await bookingService.getReservationsByDate(selectedDate);
    //const fixedReservations = await bookingService.getFixedReservations(field, selectedDate);

    if (Array.isArray(existingReservations)) {
      const availableHours = [];

      for (let hour = startTime; hour <= endTime; hour++) {
        const isField8Occupied = existingReservations.some(reservation =>
          reservation.field === 'Cancha de 8' && reservation.time.start === `${hour}:00`
        );

        const field5OccupiedCount = existingReservations.filter(reservation =>
          reservation.field === 'Cancha de 5' && reservation.time.start === `${hour}:00`
        ).length;
        const areField5Occupied = field5OccupiedCount >= 1 && field5OccupiedCount <= 3;

        if (
          (field === 'Cancha de 8' && !isField8Occupied && !areField5Occupied) ||
          (field === 'Cancha de 5' && !isField8Occupied && field5OccupiedCount < 3)
        ) {
          const promotion = promotions.find(promo =>
            promo.days.some(day => day.day === formattedDay && day.times.includes(`${hour}:00 - ${hour + 1}:00`))
          );

          let fieldPrice = null;
          if (promotion) {
            fieldPrice = field === 'Cancha de 5' ? promotion.field5Price : promotion.field8Price;
          }

          availableHours.push({ start: `${hour}:00`, end: `${hour + 1}:00`, price: fieldPrice });
        }
      }

      res.status(200).send({ field, date, availableHours });
    } else {
      res.status(500).send({ status: 'Error al obtener las reservas existentes' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: 'Error al obtener los horarios disponibles' });
  }
};

export default {
  getSchedules
};


// import { bookingService, promotionService } from '../services/services.js';

// const getSchedules = async (req, res) => {
//   try {
//     const { field, date } = req.query;
//     const selectedDate = new Date(date);
//     const dayOfWeek = selectedDate.getDay();
//     const startTime = dayOfWeek === 0 || dayOfWeek === 6 ? 15 : 16;
//     const endTime = dayOfWeek === 0 || dayOfWeek === 6 ? 22 : 23;

//     const selectedDay = selectedDate.toLocaleDateString('es-ES', { weekday: 'long' });
//     const formattedDay = selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1);
  
//     const promotions = await promotionService.getAll();

//     const existingReservations = await bookingService.getReservations(field, selectedDate);
//     console.log(existingReservations);
//     const fixedReservations = await bookingService.getFixedReservations(field, selectedDate);

//     if (Array.isArray(existingReservations)) {
//       const reservedHours = existingReservations.map(reservation => reservation.time.start);
//       const availableHours = [];

//       // Verificar si la cancha de 8 está ocupada
//       const isField8Occupied = existingReservations.some(reservation => reservation.field === 'Cancha de 8');

//       for (let hour = startTime; hour <= endTime; hour++) {
//         // Verificar si hay canchas de 8 disponibles
//         const isField8Available = !isField8Occupied && !reservedHours.includes(`${hour}:00`);

//         // Verificar si hay canchas de 5 disponibles
//         const field5Reservations = fixedReservations.filter(reservation => reservation.field === 'Cancha de 5');
//         const field5Counter = field5Reservations.length;
//         const isField5Available = field5Counter < 3 && !reservedHours.includes(`${hour}:00`);

//         // Agregar horarios disponibles según las restricciones
//         if (field === 'Cancha de 8' && isField8Available) {

//           availableHours.push({ start: `${hour}:00`, end: `${hour + 1}:00`, price: null });
//         } else if (field === 'Cancha de 5' && isField5Available) {
//           const promotion = promotions.find(promo =>
//             promo.days.some(day => day.day === formattedDay && day.times.includes(`${hour}:00 - ${hour + 1}:00`))
//           );
//           const fieldPrice = promotion ? promotion.field5Price : null;
//           availableHours.push({ start: `${hour}:00`, end: `${hour + 1}:00`, price: fieldPrice });
//         }
//       }

//       res.status(200).send({ field, date, availableHours });
//     } else {
//       res.status(500).send({ status: 'Error al obtener las reservas existentes' });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ status: 'Error al obtener los horarios disponibles' });
//   }
// };

// export default {
//   getSchedules
// };

// import { bookingService, promotionService } from '../services/services.js';

// const getSchedules = async (req, res) => {
//   try {
//     const { field, date } = req.query;
//     const selectedDate = new Date(date);
//     const dayOfWeek = selectedDate.getDay();
//     const startTime = dayOfWeek === 0 || dayOfWeek === 6 ? 15 : 16;
//     const endTime = dayOfWeek === 0 || dayOfWeek === 6 ? 22 : 23;

//     const selectedDay = selectedDate.toLocaleDateString('es-ES', { weekday: 'long' });
//     const formattedDay = selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1);

//     const promotions = await promotionService.getAll();

//     const existingReservations = await bookingService.getReservations(field, selectedDate);
//     const fixedReservations = await bookingService.getFixedReservations(field, selectedDate);

//     if (Array.isArray(existingReservations)) {
//       const reservedHours = existingReservations.map(reservation => reservation.time.start);
//       const availableHours = [];

//       if (fixedReservations && fixedReservations.length > 0) {
//         const fixedReservedHours = fixedReservations.map(reservation => reservation.time.start);

//         for (let hour = startTime; hour <= endTime; hour++) {
//           if (!reservedHours.includes(`${hour}:00`) && !fixedReservedHours.includes(`${hour}:00`)) {

//             const promotion = promotions.find(promo =>
//               promo.days.some(day => day.day === formattedDay && day.times.includes(`${hour}:00 - ${hour + 1}:00`))
//             );

//             let fieldPrice = null;
//             if (promotion) {
//               fieldPrice = field === 'Cancha de 5' ? promotion.field5Price : promotion.field8Price;
//             }

//             availableHours.push({ start: `${hour}:00`, end: `${hour + 1}:00`, price: fieldPrice });
//           }
//         }
//       } else {
//         for (let hour = startTime; hour <= endTime; hour++) {

//           if (!reservedHours.includes(`${hour}:00`)) {

//             const promotion = promotions.find(promo =>
//               promo.days.some(day => day.day === formattedDay && day.times.includes(`${hour}:00 - ${hour + 1}:00`))
//             );

//             let fieldPrice = null;
//             if (promotion) {
//               fieldPrice = field === 'Cancha de 5' ? promotion.field5Price : promotion.field8Price;
//             }

//             availableHours.push({ start: `${hour}:00`, end: `${hour + 1}:00`, price: fieldPrice });
//           }
//         }
//       }

//       res.status(200).send({ field, date, availableHours });
//     } else {
//       res.status(500).send({ status: 'Error al obtener las reservas existentes' });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ status: 'Error al obtener los horarios disponibles' });
//   }
// };

// export default {
//   getSchedules
// };