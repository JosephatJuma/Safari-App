const port = "http://192.168.1.5:10000"; //192.168.1.5
export const apiUrl = {
  trips: `${port}/all/trips`,
  getBookings: `${port}/user/all/bookings`,
  book: `${port}/user/booking/`,
  register: `${port}/user/create/`,
  search: `${port}/search`,
};

//expo doctor --fix-dependencies
