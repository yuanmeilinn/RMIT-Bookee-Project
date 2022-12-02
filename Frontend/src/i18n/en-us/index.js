export default {
  // Login
  loginPage: {
    title: "Welcome to BookyMe!",
    description: "Sign-In to view all your bookings",

    username: "Username/E-mail",
    password: "Password",
    login: "Sign-In",

    noAccount: "No Account Yet?",
    createAccount: "Create Account"
  },

  // Register
  registerPage: {
    title: "Let's Begin!",
    description: "Sign-up NOW to have access to <b>All the Advantages</b>",

    fullName: "Full Name",
    username: "Username",
    email: "E-mail Address",
    address: "Address",
    city: "State",
    postalCode: "Zip Code",
    password: "Password",
    confirmPassword: "Confirm Password",
    passwordFail: "The passwords don't match",
    required: "This is mandatory",
    registerAccount: "Sign-Up",

    alreadyHasAccount: "Already have an account?",
    login: "Sign-In",
    loginSucceded: "Login completed"
  },

  // Homepage
  homePage: {
    greeting: "Hello",
    morePopular: "More Popular",

    categories: "Categories",
    seeAll: "See All",
    recommended: "Recommendations"

  },

  // Favorites
  favoritesPage: {
    title: "Favorites",
    description: "List of Favorite Stores",
    noFavorites: "No Favorites Yet. Start Adding..."
  },

  // List Categories
  categoriesPage: {
    title: "Categories",
    results: "No Results | 1 Result | {count} Results"
  },

  storesPage: {
    error: "Failed to find services of the category chosen."
  },

  resultsPage: {
    error: "Failed to find services."
  },
  // Notifications
  notificationsPage: {
    title: "Notifications",
    read: "Read",
    unread: "Unread"
  },

  // Profile Data
  profilePage: {
    personalDetails: "Personal Details",
    editData: "Edit Data",
    security: "Security",
    language: "Language",
    changePassword: "Change Password",
    signout: "Sign-Out",
    cancel: "Cancel",
    save: "Save",
    passwordTest: "Different Passwords",
    oldPassword: "Old Password",
    newPassword: "New Password"
  },

  // Reservations
  // Edit Reservation
  // Add Review Reservation
  bookingsPage: {
    title: "Reservations",
    dataNew: "Details Booking",
    dataConf: "Confirm Booking Details",
    description: "List of Recent and Old Bookings",
    type1: "Recents",
    type2: "Completed",
    catalog: "Common Reservation",
    emptyType1: "No Recent Reservations",
    emptyType2: "No Reservations Completed",

    newBooking: {
      title: "New Booking",
      serviceType: "Type of Service",
      listService: "List of Services",
      noServices: "This Establishment does not have a Service Catalog.",
      chooseService: "Select your Service(s)",
      numberServices: "Selected Services",
      dateAndTime: "Date and Time",
      chooseDataAndTime: "Select Date and Time",
      listSlots: "Slots List",
      noSlots: "This Establishment has no slots available.",
      date: "Date",
      time: "Time",
      place: "Place",
      choosePlace: "Choose a Place",
      makeNew: "Make Booking Now",
      back: "Back Establishment Page"
    },
    ratePopup: {
      title: "Evaluate Service",
      comment: "Comment",
      submit: "Submit"
    },

    editPopup: {
      title: "Change Reservation",
      serviceType: "Change Type of Service",
      dateAndTime: "Reschedule Reservation",
      choice: "Want to cancel or change the booking?",

      changeBooking: "Change",
      cancelBooking: "Cancel"
    }
  },

  // Booking page
  // Confirm the booking made before
  bookingPage: {
    bookingDetails: "Booking Details",
    confirmBooking: "Booking Confirmation"
  },

  // View Reservation / Confirm Booking
  confirmBooking: {
    title: "Confirm Reservation",
    details: "Reservation Details",
    serviceType: "Type of Service",
    time: "Time",
    date: "Date",
    utilInfo: "Information's"
  },

  // Establishment Information
  storePage: {
    reservations: "0 Reservations | 1 Reservation | {count} Reservations",
    photos: "Photos",
    description: "Description",
    readMore: "Read More",

    utilInfo: "Useful Info",
    servicesCatalog: "Catalog of Services",
    seeAll: "See All",
    noCatalog: "The Establishment has not joined any Catalog of Services.",

    ratings: "Ratings",
    seeAllRatings: "See All",
    allRating: "All Reviews",
    stars: "0 Stars | 1 Star | {count} Stars",
    basedOn: "Based on 1 Evaluation | Based on {count} ratings",
    book: "Book now!",
    date: "Choose your date",
    dateSub: "Set your booking date"
  },

  // Search Results
  searchResultsPage: {
    title: "Results",
    description: 'Showing {count} Results for "{query}"',
  },

  settingsPage: {
    language: "Interface Language"
  },

  languages: {
    english: "English",
    portuguese: "Portuguese",
    french: "French"
  },

  commonButtons: {
    moreIcons: "More Actions",
    search: "Search...",
    cancel: "Cancel",
    submit: "Submit",
    close: "Close",
    save: "Save"
  }
}
