import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Ticket, TicketState } from '../../types';

const initialState: TicketState = {
  tickets: [],
  loading: false,
  error: null,
};

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';

export const fetchUserTickets = createAsyncThunk<Ticket[]>(
  'tickets/fetchUserTickets',
  async () => {
    const response = await axios.get(`${API_URL}/tickets`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  }
);

export const purchaseTicket = createAsyncThunk<Ticket, { eventId: string; quantity: number }>(
  'tickets/purchaseTicket',
  async ({ eventId, quantity }) => {
    const response = await axios.post(
      `${API_URL}/tickets`,
      { eventId, quantity },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data;
  }
);

export const cancelTicket = createAsyncThunk<Ticket, string>(
  'tickets/cancelTicket',
  async (ticketId) => {
    const response = await axios.put(
      `${API_URL}/tickets/${ticketId}/cancel`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data;
  }
);

const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch User Tickets
      .addCase(fetchUserTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(fetchUserTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tickets';
      })
      // Purchase Ticket
      .addCase(purchaseTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(purchaseTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets.push(action.payload);
      })
      .addCase(purchaseTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to purchase ticket';
      })
      // Cancel Ticket
      .addCase(cancelTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelTicket.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tickets.findIndex((ticket) => ticket.id === action.payload.id);
        if (index !== -1) {
          state.tickets[index] = action.payload;
        }
      })
      .addCase(cancelTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to cancel ticket';
      });
  },
});

export default ticketSlice.reducer; 