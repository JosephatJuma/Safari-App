const port = "http://192.168.45.198:10000"; //10.7.2.108  192.168.117.45 10.7.2.108
export const apiUrl = {
  trips: `${port}/all/trips`,
  getBookings: `${port}/user/all/bookings`,
  book: `${port}/user/booking/`,
  register: `${port}/user/create/`,
  search: `${port}/search`,
};

//expo doctor --fix-dependencies
