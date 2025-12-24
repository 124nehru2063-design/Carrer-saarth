import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  Phone, 
  Mail, 
  Globe, 
  Users, 
  Building,
  BookOpen,
  DollarSign,
  Calendar,
  Award,
  Heart,
  ExternalLink
} from 'lucide-react';

const CollegeDetailPage: React.FC = () => {
  const { id } = useParams();

  // Mock college data - in real app, fetch from Supabase using id
  const college = {
    id: '1',
    name: 'XYZ University',
    location: 'Fort, Mumbai, Maharashtra',
    type: 'Government University',
    established: '1857',
    rating: 4.5,
    reviews: 1250,
    description: 'The University of Mumbai is one of the oldest and premier Universities in India. It was established in 1857 and has been a pioneer in higher education.',
    programs: [
      {
        name: 'B.Sc Computer Science',
        duration: '3 years',
        fees: '₹15,000/year',
        cutoff: '85%',
        seats: 120
      },
      {
        name: 'B.Com',
        duration: '3 years',
        fees: '₹12,000/year',
        cutoff: '75%',
        seats: 200
      },
      {
        name: 'B.A English',
        duration: '3 years',
        fees: '₹10,000/year',
        cutoff: '70%',
        seats: 80
      }
    ],
    facilities: [
      'Central Library with 5 lakh books',
      'Computer Labs with latest equipment',
      'Sports Complex',
      'Hostel accommodation',
      'Medical Center',
      'Cafeteria',
      'Research Centers',
      'Auditorium'
    ],
    contact: {
      phone: '+91 22 2652 7654',
      email: 'admissions@mu.ac.in',
      website: 'www.mu.ac.in',
      address: 'University of Mumbai, Kalina, Santacruz East, Mumbai - 400098'
    },
    images: [
      // 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg',
      // 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg',
      // 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg',
      'https://media.istockphoto.com/id/1139171596/photo/row-of-large-old-victorian-style-detached-brick-houses-with-gables.jpg?s=612x612&w=0&k=20&c=BfAYZbik_QqUPhRtZzfV73xg5M66J2GtRuagbn5wQzY='
    ],
    admissionProcess: [
      'Online application submission',
      'Document verification',
      'Merit list publication',
      'Counseling and seat allocation',
      'Fee payment and admission confirmation'
    ],
    importantDates: [
      { event: 'Application Start', date: '2024-05-01' },
      { event: 'Application Deadline', date: '2024-06-15' },
      { event: 'Merit List', date: '2024-07-01' },
      { event: 'Counseling', date: '2024-07-15' }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/colleges"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Colleges</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* College Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="h-64 bg-gray-200 relative">
                <img
                  src={college.images[0]}
                  alt={college.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h1 className="text-3xl font-bold mb-2">{college.name}</h1>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{college.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{college.rating} ({college.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{college.type.split(' ')[0]}</div>
                    <div className="text-sm text-gray-600">Type</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{college.established}</div>
                    <div className="text-sm text-gray-600">Established</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{college.programs.length}</div>
                    <div className="text-sm text-gray-600">Programs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">A+</div>
                    <div className="text-sm text-gray-600">NAAC Grade</div>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed">{college.description}</p>
              </div>
            </div>

            {/* Programs */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <span>Available Programs</span>
              </h2>
              <div className="space-y-4">
                {college.programs.map((program, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{program.name}</h3>
                      <span className="text-sm text-gray-600">{program.duration}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Fees: </span>
                        <span className="font-medium text-gray-900">{program.fees}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Cutoff: </span>
                        <span className="font-medium text-gray-900">{program.cutoff}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Seats: </span>
                        <span className="font-medium text-gray-900">{program.seats}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Facilities */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Building className="h-5 w-5 text-green-600" />
                <span>Facilities</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {college.facilities.map((facility, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{facility}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Admission Process */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Award className="h-5 w-5 text-purple-600" />
                <span>Admission Process</span>
              </h2>
              <div className="space-y-3">
                {college.admissionProcess.map((step, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700">{college.contact.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700">{college.contact.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-4 w-4 text-gray-400" />
                  <a href={`https://${college.contact.website}`} className="text-blue-600 hover:text-blue-700">
                    {college.contact.website}
                  </a>
                </div>
                <div className="flex items-start space-x-3 pt-2">
                  <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                  <span className="text-gray-700 text-sm">{college.contact.address}</span>
                </div>
              </div>
            </div>

            {/* Important Dates */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-orange-500" />
                <span>Important Dates</span>
              </h3>
              <div className="space-y-3">
                {college.importantDates.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700 text-sm">{item.event}</span>
                    <span className="text-gray-900 font-medium text-sm">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center justify-center space-x-2">
                  <ExternalLink className="h-4 w-4" />
                  <span>Apply Now</span>
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium flex items-center justify-center space-x-2">
                  <Heart className="h-4 w-4" />
                  <span>Save to Wishlist</span>
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium flex items-center justify-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Contact College</span>
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Quick Facts</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-700">Student Strength:</span>
                  <span className="font-medium text-blue-900">25,000+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Faculty:</span>
                  <span className="font-medium text-blue-900">1,200+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Placement Rate:</span>
                  <span className="font-medium text-blue-900">85%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Campus Size:</span>
                  <span className="font-medium text-blue-900">243 acres</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetailPage;