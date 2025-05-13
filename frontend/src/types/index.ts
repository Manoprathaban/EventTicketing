export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  price: number;
  totalTickets: number;
  availableTickets: number;
  imageUrl: string;
}

export interface Ticket {
  id: string;
  eventId: string;
  userId: string;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  purchaseDate: string;
  event: Event;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface EventState {
  events: Event[];
  currentEvent: Event | null;
  loading: boolean;
  error: string | null;
  filters: {
    search: string;
    category: string;
    dateRange: {
      start: string | null;
      end: string | null;
    };
  };
}

export interface TicketState {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
}

export interface RootState {
  auth: AuthState;
  events: EventState;
  tickets: TicketState;
}

export {}; 