const port = "https://uprbrdwl7b.execute-api.us-west-2.amazonaws.com";
export const apiUrl = {
  trips: `${port}/all/trips`,
  getBookings: `${port}/user/all/bookings`,
  book: `${port}/user/booking/`,
  register: `${port}/user/create/`,
  search: `${port}/search`,
};

//expo doctor --fix-dependencies
