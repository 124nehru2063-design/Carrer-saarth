import React, { useState } from 'react';
import { MapPin, Search, Filter, Star, Phone, Mail, Globe, Users, Building } from 'lucide-react';

interface College {
  id: string;
  name: string;
  location: string;
  district: string;
  type: 'government' | 'private' | 'autonomous';
  rating: number;
  programs: string[];
  fees: {
    min: number;
    max: number;
  };
  facilities: string[];
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  image: string;
}

const CollegePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  // Mock data - in real app, this would come from Supabase
  const colleges: College[] = [
    {
      id: '1',
      name: 'XYZ University',
      location: 'Fort, Mumbai',
      district: 'Mumbai',
      type: 'government',
      rating: 4.5,
      programs: ['B.Sc Computer Science', 'B.Com', 'B.A English', 'BBA'],
      fees: { min: 15000, max: 50000 },
      facilities: ['Library', 'Hostel', 'Sports Complex', 'Labs'],
      contact: {
        phone: '+91 22 2652 7654',
        email: 'admissions@mu.ac.in',
        website: 'www.mu.ac.in'
      },
      image: 'https://media.istockphoto.com/id/1139171596/photo/row-of-large-old-victorian-style-detached-brick-houses-with-gables.jpg?s=612x612&w=0&k=20&c=BfAYZbik_QqUPhRtZzfV73xg5M66J2GtRuagbn5wQzY='
    },
    {
      id: '2',
      name: 'St. ABS\'s College',
      location: 'Bandra, Mumbai',
      district: 'Mumbai',
      type: 'private',
      rating: 4.8,
      programs: ['B.Sc Physics', 'B.Com', 'B.A Psychology', 'BMS'],
      fees: { min: 25000, max: 75000 },
      facilities: ['Library', 'Hostel', 'Cafeteria', 'Research Center'],
      contact: {
        phone: '+91 22 2642 0661',
        email: 'admissions@xaviers.edu',
        website: 'www.xaviers.edu'
      },
      image: 'https://www.shutterstock.com/image-photo/group-typical-english-vintage-houses-260nw-1250807224.jpg'
    },
    {
      id: '3',
      name: 'Pie University',
      location: 'North Campus, Delhi',
      district: 'Delhi',
      type: 'government',
      rating: 4.6,
      programs: ['B.Sc Mathematics', 'B.A History', 'B.Com Hons', 'BBA'],
      fees: { min: 12000, max: 40000 },
      facilities: ['Central Library', 'Hostel', 'Sports Ground', 'Medical Center'],
      contact: {
        phone: '+91 11 2766 7049',
        email: 'info@du.ac.in',
        website: 'www.du.ac.in'
      },
      image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg'
    }
  ];

  const districts = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Pune'];
  const collegeTypes = ['government', 'private', 'autonomous'];
  const programs = ['B.Sc Computer Science', 'B.Com', 'B.A English', 'BBA', 'B.Sc Physics', 'B.A Psychology'];

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = !selectedDistrict || college.district === selectedDistrict;
    const matchesType = !selectedType || college.type === selectedType;
    const matchesProgram = !selectedProgram || college.programs.some(p => p.includes(selectedProgram));

    return matchesSearch && matchesDistrict && matchesType && matchesProgram;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">College Directory</h1>
              <p className="text-gray-600">Find the perfect college for your career goals</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  viewMode === 'map' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Map View
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search colleges..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 py-2.5"
                />
              </div>
            </div>

            {/* District Filter */}
            <div>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 py-2.5"
              >
                <option value="">All Districts</option>
                {districts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 py-2.5"
              >
                <option value="">All Types</option>
                {collegeTypes.map(type => (
                  <option key={type} value={type} className="capitalize">{type}</option>
                ))}
              </select>
            </div>

            {/* Program Filter */}
            <div>
              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 py-2.5"
              >
                <option value="">All Programs</option>
                {programs.map(program => (
                  <option key={program} value={program}>{program}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-600">
            Found {filteredColleges.length} college{filteredColleges.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* College Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredColleges.map((college) => (
            <div key={college.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {/* College Image */}
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <img
                  src={college.image}
                  alt={college.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-white rounded-full px-2 py-1 flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs font-medium">{college.rating}</span>
                  </div>
                </div>
              </div>

              {/* College Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {college.name}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                    college.type === 'government' ? 'bg-green-100 text-green-700' :
                    college.type === 'private' ? 'bg-blue-100 text-blue-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {college.type}
                  </span>
                </div>

                <div className="flex items-center space-x-1 text-gray-600 mb-3">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{college.location}</span>
                </div>

                {/* Programs */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Programs Offered</h4>
                  <div className="flex flex-wrap gap-1">
                    {college.programs.slice(0, 3).map((program, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {program}
                      </span>
                    ))}
                    {college.programs.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        +{college.programs.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Fees */}
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Annual Fees</span>
                    <span className="font-semibold text-gray-900">
                      ₹{college.fees.min.toLocaleString()} - ₹{college.fees.max.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Facilities */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Facilities</h4>
                  <div className="flex flex-wrap gap-1">
                    {college.facilities.slice(0, 4).map((facility, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm">
                    View Details
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <Star className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredColleges.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 border border-gray-200 text-center">
            <Building className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No colleges found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or filters to find more colleges.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDistrict('');
                setSelectedType('');
                setSelectedProgram('');
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegePage;