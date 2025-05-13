import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { CalendarIcon, MapPinIcon, TagIcon, TicketIcon } from '@heroicons/react/24/outline';
import { RootState, Event as EventType } from '../types';
// import { fetchEventById } from '../store/slices/eventSlice';
// import { purchaseTicket } from '../store/slices/ticketSlice';
import { useAppDispatch } from '../store';

const HARDCODED_EVENTS: EventType[] = [
  {
    id: "1",
    title: "Business Conference 2024",
    description: "A conference for business professionals.",
    date: "2024-08-10T09:00:00.000Z",
    location: "London",
    category: "Business",
    price: 100,
    totalTickets: 300,
    availableTickets: 300,
    imageUrl: "https://via.placeholder.com/300x200.png?text=Business+Conference"
  },
  {
    id: "2",
    title: "Summer Music Festival",
    description: "Enjoy live music from top artists.",
    date: "2024-07-20T18:00:00.000Z",
    location: "New York",
    category: "Music",
    price: 50,
    totalTickets: 500,
    availableTickets: 500,
    imageUrl: "https://via.placeholder.com/300x200.png?text=Music+Festival"
  },
  {
    id: "3",
    title: "Tech Expo 2024",
    description: "Explore the latest in technology and innovation.",
    date: "2024-09-15T10:00:00.000Z",
    location: "San Francisco",
    category: "Technology",
    price: 75,
    totalTickets: 400,
    availableTickets: 400,
    imageUrl: "https://via.placeholder.com/300x200.png?text=Tech+Expo"
  },
  {
    id: "4",
    title: "Art & Food Fair",
    description: "A celebration of art and culinary delights.",
    date: "2024-06-25T12:00:00.000Z",
    location: "Paris",
    category: "Food",
    price: 30,
    totalTickets: 250,
    availableTickets: 250,
    imageUrl: "https://via.placeholder.com/300x200.png?text=Art+Food+Fair"
  }
];

const EventDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentEvent, setCurrentEvent] = useState<EventType | null>(null);
  const [localAvailableTickets, setLocalAvailableTickets] = useState(0);

  useEffect(() => {
    if (id) {
      const found = HARDCODED_EVENTS.find(e => e.id === id);
      setCurrentEvent(found || null);
      setLocalAvailableTickets(found ? found.availableTickets : 0);
    }
  }, [id]);

  const handlePurchase = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/events/${id}` } });
      return;
    }
    if (!currentEvent) return;
    if (!name.trim() || !email.trim()) {
      toast.error('Please enter your name and email.');
      return;
    }
    if (quantity > localAvailableTickets) {
      toast.error('Not enough tickets available.');
      return;
    }
    setLocalAvailableTickets(localAvailableTickets - quantity);
    toast.success(`Mock payment successful!\nName: ${name}\nEmail: ${email}`);
    setName('');
    setEmail('');
  };

  if (!currentEvent) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg">Event not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96">
          <img
            src={currentEvent.imageUrl}
            alt={currentEvent.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-primary-600 text-white px-4 py-2 rounded-full text-lg font-medium">
            ${currentEvent.price}
          </div>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{currentEvent.title}</h1>
            <p className="text-gray-600 mb-6">{currentEvent.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <CalendarIcon className="h-6 w-6 mr-3" />
                  <span>{format(new Date(currentEvent.date), 'PPP')}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPinIcon className="h-6 w-6 mr-3" />
                  <span>{currentEvent.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <TagIcon className="h-6 w-6 mr-3" />
                  <span className="capitalize">{currentEvent.category}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <TicketIcon className="h-6 w-6 mr-3" />
                  <span>{localAvailableTickets} tickets left</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Purchase Tickets</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
                placeholder="Enter your name"
              />
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-gray-700 mb-2">
                Number of Tickets
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                {Array.from({ length: Math.min(10, localAvailableTickets) }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <span className="text-gray-700">Total Price:</span>
              <span className="ml-2 text-2xl font-bold text-gray-900">
                ${(currentEvent.price * quantity).toFixed(2)}
              </span>
            </div>
            <button
              onClick={handlePurchase}
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
            >
              {isAuthenticated ? 'Purchase' : 'Sign in to Purchase'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails; 