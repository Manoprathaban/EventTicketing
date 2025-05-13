import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../types';
import { fetchUserTickets } from '../store/slices/ticketSlice';
import { useAppDispatch } from '../store';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { cancelTicket } from '../store/slices/ticketSlice';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tickets, loading, error } = useSelector((state: RootState) => state.tickets);

  useEffect(() => {
    dispatch(fetchUserTickets());
  }, [dispatch]);

  const handleCancelTicket = async (ticketId: string) => {
    try {
      await dispatch(cancelTicket(ticketId));
      toast.success('Ticket cancelled successfully');
    } catch (error) {
      toast.error('Failed to cancel ticket');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Tickets</h1>
      
      {tickets.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500 text-lg">You haven't purchased any tickets yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover md:w-48"
                    src={ticket.event.imageUrl}
                    alt={ticket.event.title}
                  />
                </div>
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        {ticket.event.title}
                      </h2>
                      <p className="text-gray-600 mb-4">
                        {format(new Date(ticket.event.date), 'PPP')} at {ticket.event.location}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        ticket.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : ticket.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                      </span>
                      <span className="mt-2 text-lg font-semibold text-gray-900">
                        ${ticket.totalPrice}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      <p>Quantity: {ticket.quantity}</p>
                      <p>Purchase Date: {format(new Date(ticket.purchaseDate), 'PPP')}</p>
                    </div>
                    {ticket.status === 'confirmed' && (
                      <button
                        onClick={() => handleCancelTicket(ticket.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Cancel Ticket
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard; 