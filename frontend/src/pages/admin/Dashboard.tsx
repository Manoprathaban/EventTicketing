import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { RootState } from '../../types';
import { 
  fetchEvents, 
  createEvent, 
  updateEvent, 
  deleteEvent 
} from '../../store/slices/eventSlice';
import { useAppDispatch } from '../../store';

const AdminDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { events, loading, error } = useSelector((state: RootState) => state.events);
  
  const [form, setForm] = useState({
    id: '',
    title: '',
    description: '',
    date: '',
    location: '',
    category: '',
    price: '',
    totalTickets: '',
    availableTickets: '',
    imageUrl: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const eventData = {
        title: form.title,
        description: form.description,
        date: form.date, // This should be in ISO format
        location: form.location,
        category: form.category,
        price: Number(form.price),
        totalTickets: Number(form.totalTickets),
        availableTickets: Number(form.availableTickets),
        imageUrl: form.imageUrl,
      };

      if (editingId) {
        await dispatch(updateEvent({ id: editingId, ...eventData })).unwrap();
        toast.success('Event updated successfully');
        setEditingId(null);
      } else {
        await dispatch(createEvent(eventData)).unwrap();
        toast.success('Event created successfully');
      }
      
      // Reset form
      setForm({
        id: '',
        title: '',
        description: '',
        date: '',
        location: '',
        category: '',
        price: '',
        totalTickets: '',
        availableTickets: '',
        imageUrl: '',
      });
    } catch (err) {
      toast.error('Failed to save event');
    }
  };

  const handleEdit = (event: any) => {
    // Format the date to YYYY-MM-DD for the input field
    const formattedDate = format(new Date(event.date), 'yyyy-MM-dd');
    
    setForm({
      ...event,
      date: formattedDate,
      price: String(event.price),
      totalTickets: String(event.totalTickets),
      availableTickets: String(event.availableTickets)
    });
    setEditingId(event.id);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await dispatch(deleteEvent(id)).unwrap();
        toast.success('Event deleted successfully');
        if (editingId === id) setEditingId(null);
      } catch (err) {
        toast.error('Failed to delete event');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Manage Events</h2>
        <Link to="/admin/events/create" className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700">
          Create New Event
        </Link>
      </div>
      
      <form onSubmit={handleAddOrUpdate} className="bg-white p-4 rounded shadow mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          name="title" 
          value={form.title} 
          onChange={handleInputChange} 
          placeholder="Title" 
          className="border p-2 rounded" 
          required 
        />
        <input 
          name="date" 
          value={form.date} 
          onChange={handleInputChange} 
          type="date" 
          className="border p-2 rounded" 
          required 
        />
        <input 
          name="location" 
          value={form.location} 
          onChange={handleInputChange} 
          placeholder="Location" 
          className="border p-2 rounded" 
          required 
        />
        <input 
          name="category" 
          value={form.category} 
          onChange={handleInputChange} 
          placeholder="Category" 
          className="border p-2 rounded" 
          required 
        />
        <input 
          name="price" 
          value={form.price} 
          onChange={handleInputChange} 
          placeholder="Price" 
          type="number" 
          min="0" 
          step="0.01" 
          className="border p-2 rounded" 
          required 
        />
        <input 
          name="totalTickets" 
          value={form.totalTickets} 
          onChange={handleInputChange} 
          placeholder="Total Tickets" 
          type="number" 
          min="1" 
          className="border p-2 rounded" 
          required 
        />
        <input 
          name="availableTickets" 
          value={form.availableTickets} 
          onChange={handleInputChange} 
          placeholder="Available Tickets" 
          type="number" 
          min="0" 
          className="border p-2 rounded" 
          required 
        />
        <input 
          name="imageUrl" 
          value={form.imageUrl} 
          onChange={handleInputChange} 
          placeholder="Image URL" 
          className="border p-2 rounded" 
          required 
        />
        <textarea 
          name="description" 
          value={form.description} 
          onChange={handleInputChange} 
          placeholder="Description" 
          className="border p-2 rounded col-span-1 md:col-span-2" 
          required 
        />
        <button 
          type="submit" 
          className="bg-primary-600 text-white rounded px-4 py-2 col-span-1 md:col-span-2 hover:bg-primary-700"
          disabled={loading}
        >
          {loading ? 'Saving...' : (editingId ? 'Update Event' : 'Add Event')}
        </button>
      </form>
      
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-4">All Events</h2>
        {loading && <p className="text-center py-4">Loading events...</p>}
        {!loading && events.length === 0 && (
          <p className="text-center py-4">No events found. Create your first event!</p>
        )}
        {!loading && events.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="py-2">Title</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Tickets</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map(event => (
                  <tr key={event.id} className="border-t">
                    <td className="py-2">{event.title}</td>
                    <td>{format(new Date(event.date), 'yyyy-MM-dd')}</td>
                    <td>{event.location}</td>
                    <td>{event.category}</td>
                    <td>${event.price}</td>
                    <td>{event.availableTickets}/{event.totalTickets}</td>
                    <td>
                      <button 
                        onClick={() => handleEdit(event)} 
                        className="text-blue-600 mr-2 hover:underline"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(event.id)} 
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 