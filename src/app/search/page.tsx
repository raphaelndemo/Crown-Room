'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { NavbarDemo } from '@/components/resizable-navbar';
import FilterBar from '@/components/FilterBar';
import Footer from '@/components/ui/footer';


const mockStylists = [
  {
    id: '1',
    name: 'Sarah Johnson',
    image: '/images/stylist1.webp',
    rating: 4.8,
    reviewCount: 127,
    services: ['Braids', 'Natural Hair', 'Silk Press'],
    location: 'Downtown',
    price: '$80-120',
    availability: 'Available today',
    experience: '8 years',
    specialties: ['Protective Styles', 'Color'],
  },
  {
    id: '2',
    name: 'Maria Rodriguez',
    image: '/images/stylist3.webp',
    rating: 4.9,
    reviewCount: 89,
    services: ['Weaves', 'Eyelashes', 'Makeup'],
    location: 'Midtown',
    price: '$100-150',
    availability: 'Available tomorrow',
    experience: '12 years',
    specialties: ['Bridal', 'Extensions'],
  },
  {
    id: '3',
    name: 'Aisha Thompson',
    image: '/images/gallery1.png',
    rating: 4.7,
    reviewCount: 203,
    services: ['Locs', 'Natural Hair', 'Kids'],
    location: 'Uptown',
    price: '$60-90',
    availability: 'Available today',
    experience: '6 years',
    specialties: ['Loc Maintenance', 'Children'],
  },
  {
    id: '4',
    name: 'Jennifer Lee',
    image: '/images/stylist4.webp',
    rating: 4.6,
    reviewCount: 156,
    services: ['Haircut', 'Color', 'Nails'],
    location: 'Downtown',
    price: '$70-110',
    availability: 'Available next week',
    experience: '10 years',
    specialties: ['Haircuts', 'Hair Color'],
  },
  {
    id: '5',
    name: 'Tiffany Williams',
    image: '/images/stylist5.webp',
    rating: 4.9,
    reviewCount: 94,
    services: ['Braids', 'Weaves', 'Silk Press'],
    location: 'Midtown',
    price: '$90-130',
    availability: 'Available today',
    experience: '9 years',
    specialties: ['Box Braids', 'Sew-ins'],
  },
  {
    id: '6',
    name: 'Amanda Davis',
    image: '/images/stylist10.jpg',
    rating: 4.5,
    reviewCount: 78,
    services: ['Makeup', 'Eyelashes', 'Nails'],
    location: 'Uptown',
    price: '$50-80',
    availability: 'Available tomorrow',
    experience: '5 years',
    specialties: ['Bridal Makeup', 'Lash Extensions'],
  },
];

const serviceMap: { [key: string]: string } = {
  'braids': 'Braids',
  'natural-hair': 'Natural Hair',
  'womens-haircut': "Women's Haircut",
  'mens-haircut': "Men's Haircut",
  'locs': 'Locs',
  'silk-press': 'Silk Press',
  'weaves': 'Weaves',
  'eyelashes': 'Eyelashes',
  'nails': 'Nails',
  'color': 'Color',
  'kids': 'Kids',
  'makeup': 'Makeup',
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service');
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedPrice, setSelectedPrice] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredStylists, setFilteredStylists] = useState(mockStylists);

  useEffect(() => {
    if (serviceParam && serviceMap[serviceParam]) {
      setSelectedService(serviceMap[serviceParam]);
    }
  }, [serviceParam]);

  useEffect(() => {
    let filtered = mockStylists;

    // Filter by service
    if (selectedService) {
      filtered = filtered.filter(stylist => 
        stylist.services.includes(selectedService)
      );
    }

    
    if (selectedLocation) {
      filtered = filtered.filter(stylist => 
        stylist.location === selectedLocation
      );
    }

    // Filter by price range
    if (selectedPrice) {
      filtered = filtered.filter(stylist => {
        const priceRange = stylist.price;
        switch (selectedPrice) {
          case 'under-50':
            return priceRange.includes('$50') || priceRange.includes('$60');
          case '50-100':
            return priceRange.includes('$70') || priceRange.includes('$80') || priceRange.includes('$90');
          case '100-150':
            return priceRange.includes('$100') || priceRange.includes('$110') || priceRange.includes('$120') || priceRange.includes('$130');
          case 'over-150':
            return priceRange.includes('$150');
          default:
            return true;
        }
      });
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(stylist =>
        stylist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stylist.services.some(service => 
          service.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        stylist.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    setFilteredStylists(filtered);
  }, [selectedService, selectedLocation, selectedPrice, searchQuery]);

  const locations = ['Downtown', 'Midtown', 'Uptown'];
  const priceRanges = [
    { value: 'under-50', label: 'Under $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100-150', label: '$100 - $150' },
    { value: 'over-150', label: 'Over $150' },
  ];

  const clearFilters = () => {
    setSelectedService('');
    setSelectedLocation('');
    setSelectedPrice('');
    setSearchQuery('');
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <NavbarDemo />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Find Your Perfect Stylist
          </h1>
          <p className="text-gray-600">
            {selectedService ? `Showing stylists for ${selectedService}` : 'Browse our talented stylists and book your appointment'}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                placeholder="Search stylists or services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            {/* Service Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="">All Services</option>
                {Object.values(serviceMap).map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="">All Prices</option>
                {priceRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          {(selectedService || selectedLocation || selectedPrice || searchQuery) && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={clearFilters}
                className="text-sm text-pink-600 hover:text-pink-700 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {filteredStylists.length} stylist{filteredStylists.length !== 1 ? 's' : ''} found
            </h2>
            <div className="text-sm text-gray-500">
              Sorted by rating
            </div>
          </div>

          {filteredStylists.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No stylists found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStylists.map((stylist) => (
                <div key={stylist.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Stylist Image */}
                  <div className="relative h-60 bg-gray-200">
                    <Image
                      src={stylist.image}
                      alt={stylist.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  

                  {/* Stylist Info */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{stylist.name}</h3>
                        <p className="text-sm text-gray-500">{stylist.location}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center mb-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(stylist.rating) ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="ml-1 text-sm font-medium text-gray-900">{stylist.rating}</span>
                        </div>
                        <p className="text-xs text-gray-500">({stylist.reviewCount} reviews)</p>
                      </div>
                    </div>

                    {/* Services */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Services:</p>
                      <div className="flex flex-wrap gap-1">
                        {stylist.services.slice(0, 3).map((service) => (
                          <span
                            key={service}
                            className="inline-block bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full"
                          >
                            {service}
                          </span>
                        ))}
                        {stylist.services.length > 3 && (
                          <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                            +{stylist.services.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price and Availability */}
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{stylist.price}</p>
                        <p className="text-xs text-gray-500">{stylist.experience} experience</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-green-600 font-medium">{stylist.availability}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link
                        href={`/stylists/${stylist.name.toLowerCase().replace(' ', '-')}`}
                        className="flex-1 bg-gray-100 text-gray-900 text-sm font-medium py-2 px-4 rounded-md hover:bg-gray-200 transition-colors text-center"
                      >
                        View Profile
                      </Link>
                      <Link
                        href={`/booking/${stylist.id}?service=${stylist.services[0]}`}
                        className="flex-1 bg-pink-600 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-pink-700 transition-colors text-center"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
} 