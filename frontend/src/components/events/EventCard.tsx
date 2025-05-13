import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { CalendarIcon, MapPinIcon, TagIcon } from '@heroicons/react/24/outline';
import { Event } from '../../types';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          ${event.price}
        </div>
      </div>
      <div className="p-6">
        <Link
          to={`/events/${event.id}`}
          className="text-xl font-semibold text-gray-900 hover:text-primary-600 transition-colors duration-200"
        >
          {event.title}
        </Link>
        <p className="mt-2 text-gray-600 line-clamp-2">{event.description}</p>
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-gray-500">
            <CalendarIcon className="h-5 w-5 mr-2" />
            <span>{format(new Date(event.date), 'PPP')}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <MapPinIcon className="h-5 w-5 mr-2" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <TagIcon className="h-5 w-5 mr-2" />
            <span className="capitalize">{event.category}</span>
          </div>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {event.availableTickets} tickets left
          </span>
          <Link
            to={`/events/${event.id}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard; 