import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Event, EventState } from '../../types';

interface EventFilters {
  search: string;
  category: string;
  dateRange: {
    start: string | null;
    end: string | null;
  };
}

const initialState: EventState & { filters: EventFilters } = {
  events: [],
  currentEvent: null,
  loading: false,
  error: null,
  filters: {
    search: '',
    category: '',
    dateRange: {
      start: null,
      end: null,
    },
  },
};

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';

export const fetchEvents = createAsyncThunk<Event[]>(
  'events/fetchEvents',
  async () => {
    try {
      const response = await axios.get(`${API_URL}/events`);
      return response.data;
    } catch (error) {
      // Fallback to sample data if API is not available
      console.warn('Using sample data as API is not available:', error);
      return [
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
    }
  }
);

export const fetchEventById = createAsyncThunk<Event, string>(
  'events/fetchEventById',
  async (id) => {
    try {
      const response = await axios.get(`${API_URL}/events/${id}`);
      return response.data;
    } catch (error) {
      // Fallback to sample data if API is not available
      console.warn('Using sample data as API is not available:', error);
      
      // The same hardcoded events as in fetchEvents
      const events = [
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
      const event = events.find(e => e.id === id);
      if (!event) throw new Error('Event not found');
      return event;
    }
  }
);

export const createEvent = createAsyncThunk<Event, Omit<Event, 'id' | 'createdAt' | 'updatedAt'>>(
  'events/createEvent',
  async (eventData) => {
    const response = await axios.post(`${API_URL}/events`, eventData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  }
);

export const updateEvent = createAsyncThunk<Event, { id: string } & Partial<Event>>(
  'events/updateEvent',
  async ({ id, ...eventData }) => {
    const response = await axios.put(`${API_URL}/events/${id}`, eventData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  }
);

export const deleteEvent = createAsyncThunk<string, string>(
  'events/deleteEvent',
  async (id) => {
    await axios.delete(`${API_URL}/events/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return id;
  }
);

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearCurrentEvent: (state) => {
      state.currentEvent = null;
    },
    setFilters: (state, action: { payload: Partial<EventFilters> }) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Events
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch events';
      })
      // Fetch Event by ID
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentEvent = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch event';
      })
      // Create Event
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events.push(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create event';
      })
      // Update Event
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.events.findIndex((event) => event.id === action.payload.id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
        if (state.currentEvent?.id === action.payload.id) {
          state.currentEvent = action.payload;
        }
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update event';
      })
      // Delete Event
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events.filter((event) => event.id !== action.payload);
        if (state.currentEvent?.id === action.payload) {
          state.currentEvent = null;
        }
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete event';
      });
  },
});

export const { clearCurrentEvent, setFilters } = eventSlice.actions;
export default eventSlice.reducer; 