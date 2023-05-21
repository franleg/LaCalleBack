import Dao from '../models/dao.js';
import BookingRepository from './BookingRepository.js';
import DayRepository from './DayRepository.js';
import FieldRepository from './FieldRepository.js';
import UserRepository from './UserRepository.js';
import ScheduleRepository from './ScheduleRepository.js';

const dao = new Dao();

export const bookingService = new BookingRepository(dao);
export const dayService = new DayRepository(dao);
export const fieldService = new FieldRepository(dao);
export const userService = new UserRepository(dao);
export const scheduleService = new ScheduleRepository(dao);