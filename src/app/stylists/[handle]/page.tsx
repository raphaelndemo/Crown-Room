'use client';

import { useState } from 'react';
import { NavbarDemo } from '@/components/resizable-navbar';
import Footer from '@/components/ui/footer';
import Link from 'next/link';
import { ParallaxScroll } from '@/components/ui/parallax-scroll';


const mockStylist = {
  id: '1',
  handle: 'sarah-johnson',
  name: 'Sarah Johnson',
  image: '/images/profile1.jpg',
  rating: 4.8,
  reviewCount: 127,
  gallery: [
    '/images/profile1.jpg',
    '/images/stylist10.jpg',
    '/images/braided.png',
    '/images/testimonial4.png',
    '/images/braids2.jpg',
    '/images/braids2.png',
    '/images/braid.png',
    '/images/gallery7.png',
    '/images/silk_press.png',
  ],
  services: [
    { name: 'Braids', price: '$80-120', duration: '2-4 hours' },
    { name: 'Natural Hair', price: '$60-90', duration: '1-2 hours' },
    { name: 'Silk Press', price: '$70-100', duration: '1.5-2 hours' },
  ],
  location: 'Downtown',
  experience: '8 years',
  specialties: ['Protective Styles', 'Color', 'Natural Hair Care'],
  about: 'Sarah is a passionate stylist with over 8 years of experience specializing in natural hair care and protective styles. She believes in healthy hair practices and creating styles that not only look beautiful but also protect and nurture your natural hair.',
  availability: [
    { day: 'Monday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Tuesday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Wednesday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Thursday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Friday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
    { day: 'Sunday', hours: 'Closed' },
  ],
  reviews: [
    {
      id: '1',
      name: 'Jessica M.',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Sarah did an amazing job with my box braids! They look so natural and she was so gentle with my hair. Highly recommend!',
    },
    {
      id: '2',
      name: 'Michelle K.',
      rating: 5,
      date: '1 month ago',
      comment: 'Best silk press I\'ve ever had! My hair was so smooth and lasted for days. Sarah really knows what she\'s doing.',
    },
    {
      id: '3',
      name: 'Ashley T.',
      rating: 4,
      date: '2 months ago',
      comment: 'Great experience overall. Sarah is very professional and takes her time to ensure quality work.',
    },
  ],
};

type Props = { params: { handle: string } };

export default function StylistProfilePage({ params }: Props) {
  const [cart, setCart] = useState<Array<{ name: string; price: string; duration: string }>>([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<string>('no-preference');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookingDetails, setBookingDetails] = useState<{
    staff: string;
    date: string;
    time: string;
  } | null>(null);

  // In a real app, you would fetch the stylist data based on params.handle
  const stylist = mockStylist;

  // Mock staff data - will be sourced from DB later
  const availableStaff = [
    { id: 'no-preference', name: 'No preference', description: 'Automatically select available stylist' },
    { id: 'sarah-johnson', name: 'Sarah Johnson', description: 'Senior Stylist - 8 years experience' },
    { id: 'emma-wilson', name: 'Emma Wilson', description: 'Color Specialist - 5 years experience' },
    { id: 'maya-davis', name: 'Maya Davis', description: 'Natural Hair Expert - 6 years experience' },
  ];

  const timeSlots = {
    'Early Hours': ['09:00 AM', '09:15 AM', '09:30 AM', '09:45 AM', '10:00 AM', '10:15 AM', '10:30 AM', '10:45 AM', '11:00 AM', '11:15 AM', '11:30 AM', '11:45 AM', '12:00 PM', '12:15 PM', '12:30 PM', '12:45 PM'],
    'Afternoon': ['01:00 PM', '01:15 PM', '01:30 PM', '01:45 PM', '02:00 PM', '02:15 PM', '02:30 PM', '02:45 PM', '03:00 PM', '03:15 PM', '03:30 PM', '03:45 PM'],
    'Late Hours': ['04:00 PM', '04:15 PM', '04:30 PM', '04:45 PM', '05:00 PM', '05:15 PM', '05:30 PM', '05:45 PM', '06:00 PM', '06:15 PM', '06:30 PM', '06:45 PM']
  };

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const addToCart = (service: { name: string; price: string; duration: string }) => {
    setCart(prevCart => [...prevCart, service]);
  };

  const removeFromCart = (index: number) => {
    setCart(prevCart => prevCart.filter((_, i) => i !== index));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, service) => {
      const priceRange = service.price.replace('$', '');
      const [minPrice] = priceRange.split('-');
      return total + parseInt(minPrice);
    }, 0);
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      setShowBookingModal(true);
    }
  };

  const handleConfirmBooking = () => {
    if (selectedDate && selectedTime) {
      setBookingDetails({
        staff: selectedStaff,
        date: selectedDate,
        time: selectedTime
      });
      setShowBookingModal(false);
    }
  };

  const handleAddMoreServices = () => {
    setShowBookingModal(false);
    // Scroll to services section
    document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatDate = (date: Date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
  };

  const formatDateForDisplay = (dateString: string) => {
    const date = new Date(dateString);
    return formatDate(date);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <NavbarDemo />
      
      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Complete Your Booking</h2>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Booking Options */}
                <div className="space-y-6">
                  {/* Staff Selection */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Staff</h3>
                    <div className="space-y-3">
                      {availableStaff.map((staff) => (
                        <label key={staff.id} className="flex items-start space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="staff"
                            value={staff.id}
                            checked={selectedStaff === staff.id}
                            onChange={(e) => setSelectedStaff(e.target.value)}
                            className="mt-1 text-pink-600 focus:ring-pink-500"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{staff.name}</div>
                            <div className="text-sm text-gray-500">{staff.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h3>
                    <div className="flex space-x-3 overflow-x-auto pb-2">
                      {getAvailableDates().map((date, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedDate(date.toISOString().split('T')[0])}
                          className={`flex-shrink-0 px-4 py-3 rounded-lg border-2 transition-all ${
                            selectedDate === date.toISOString().split('T')[0]
                              ? 'border-pink-500 bg-pink-50 text-pink-700'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-sm font-medium">{formatDate(date)}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Time</h3>
                    <div className="space-y-4">
                      {Object.entries(timeSlots).map(([period, times]) => (
                        <div key={period}>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">{period}</h4>
                          <div className="grid grid-cols-4 gap-2">
                            {times.map((time) => (
                              <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`px-3 py-2 text-sm rounded-md transition-all ${
                                  selectedTime === time
                                    ? 'bg-pink-500 text-white'
                                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Cart Summary */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
                  
                  {/* Services */}
                  <div className="space-y-3 mb-4">
                    {cart.map((service, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900 text-sm">{service.name}</div>
                          <div className="text-xs text-gray-500">{service.duration}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900 text-sm">{service.price}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">Total:</span>
                      <span className="font-bold text-lg text-gray-900">${getTotalPrice()}</span>
                    </div>
                  </div>

                  {/* Confirm Button */}
                  <button
                    onClick={handleConfirmBooking}
                    disabled={!selectedDate || !selectedTime}
                    className="w-full bg-pink-600 text-white font-medium py-3 px-4 rounded-md hover:bg-pink-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-pink-600">Home</Link></li>
            <li>/</li>
            <li><Link href="/search" className="hover:text-pink-600">Stylists</Link></li>
            <li>/</li>
            <li className="text-gray-900">{stylist.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Stylist Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Stylist Image */}
                <div className="relative w-40 sm:w-25 sm:h-25 h-40 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={stylist.image}
                    alt={stylist.name || "Stylist"}
                    className="w-full h-full object-cover"
                  />
                </div>
                

                {/* Stylist Info */}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{stylist.name}</h1>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center mr-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(stylist.rating) ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-lg font-medium text-gray-900">{stylist.rating}</span>
                    </div>
                    <span className="text-gray-500">({stylist.reviewCount} reviews)</span>
                  </div>
                  <p className="text-gray-600 mb-2">{stylist.location} • {stylist.experience} experience</p>
                  <div className="flex flex-wrap gap-2">
                    {stylist.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="inline-block bg-pink-100 text-pink-800 text-sm px-3 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Gallery</h2>
              <div className="-mx-4">
                {/* ParallaxScroll expects an array of image URLs */}
                <ParallaxScroll images={stylist.gallery} />
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed">{stylist.about}</p>
            </div>

            {/* Services */}
            <div id="services-section" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Services & Pricing</h2>
              <div className="space-y-4">
                {stylist.services.map((service) => (
                  <div key={service.name} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-500">{service.duration}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{service.price}</p>
                      </div>
                      <button
                        onClick={() => addToCart(service)}
                        className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors text-sm font-medium"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Reviews</h2>
              <div className="space-y-6">
                {stylist.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">{review.name}</h3>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Enhanced Cart */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Cart</h2>
              
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-2">
                    <img 
                      src="/images/shopping-cart.svg" 
                      alt="Shopping Cart" 
                      className="w-16 h-16 mx-auto"
                    />
                  </div>
                  <p className="text-gray-500">Your cart is empty</p>
                  <p className="text-sm text-gray-400">Add services to get started</p>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="space-y-4 mb-6">
                    {cart.map((service, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 text-sm">{service.name}</h3>
                          <p className="text-xs text-gray-500">{service.duration}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 text-sm">{service.price}</span>
                          <button
                            onClick={() => removeFromCart(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add More Services Link */}
                  <div className="mb-4">
                    <button
                      onClick={handleAddMoreServices}
                      className="text-pink-600 hover:text-pink-700 text-sm font-medium transition-colors"
                    >
                      + Add more services
                    </button>
                  </div>

                  {/* Booking Details */}
                  {bookingDetails && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Date & Time:</div>
                      <div className="text-sm font-medium text-gray-900">
                        {formatDateForDisplay(bookingDetails.date)}, {bookingDetails.time}
                      </div>
                      {bookingDetails.staff !== 'no-preference' && (
                        <>
                          <div className="text-sm text-gray-600 mb-1 mt-2">Staff:</div>
                          <div className="text-sm font-medium text-gray-900">
                            {availableStaff.find(s => s.id === bookingDetails.staff)?.name}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Cart Total */}
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">Total:</span>
                      <span className="font-bold text-lg text-gray-900">${getTotalPrice()}</span>
                    </div>
                    <p className="text-xs text-gray-500">*Prices shown are starting prices</p>
                  </div>

                  {/* Action Button */}
                  {!bookingDetails ? (
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-pink-600 text-white font-medium py-3 px-4 rounded-md hover:bg-pink-700 transition-colors"
                    >
                      Select Staff, Date & Time
                    </button>
                  ) : (
                    <button
                      onClick={() => alert('Redirecting to payment...')}
                      className="w-full bg-green-600 text-white font-medium py-3 px-4 rounded-md hover:bg-green-700 transition-colors"
                    >
                      Book Now
                    </button>
                  )}
                </>
              )}

              {/* Availability */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Availability</h3>
                <div className="space-y-2">
                  {stylist.availability.map((day) => (
                    <div key={day.day} className="flex justify-between text-sm">
                      <span className="text-gray-600">{day.day}</span>
                      <span className="text-gray-900">{day.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
} 