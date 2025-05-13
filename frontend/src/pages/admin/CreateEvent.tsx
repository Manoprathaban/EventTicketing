import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../store';
import { createEvent } from '../../store/slices/eventSlice';
import { toast } from 'react-toastify';

interface CreateEventFormValues {
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  price: string;
  totalTickets: string;
  imageUrl: string;
}

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  date: Yup.date().required('Date is required').min(new Date(), 'Date must be in the future'),
  location: Yup.string().required('Location is required'),
  category: Yup.string().required('Category is required'),
  price: Yup.number()
    .required('Price is required')
    .min(0, 'Price must be greater than or equal to 0'),
  totalTickets: Yup.number()
    .required('Total tickets is required')
    .min(1, 'Total tickets must be at least 1'),
  imageUrl: Yup.string().url('Must be a valid URL').required('Image URL is required'),
});

const CreateEvent: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialValues: CreateEventFormValues = {
    title: '',
    description: '',
    date: '',
    location: '',
    category: '',
    price: '',
    totalTickets: '',
    imageUrl: '',
  };

  const handleSubmit = async (values: CreateEventFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      await dispatch(createEvent({
        ...values,
        price: parseFloat(values.price),
        totalTickets: parseInt(values.totalTickets),
        availableTickets: parseInt(values.totalTickets),
      }));
      toast.success('Event created successfully');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error('Failed to create event');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Event</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <Field
                  type="text"
                  name="title"
                  id="title"
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    errors.title && touched.title
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                  }`}
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  id="description"
                  rows={4}
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    errors.description && touched.description
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                  }`}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <Field
                    type="datetime-local"
                    name="date"
                    id="date"
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      errors.date && touched.date
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                    }`}
                  />
                  <ErrorMessage
                    name="date"
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <Field
                    type="text"
                    name="location"
                    id="location"
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      errors.location && touched.location
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                    }`}
                  />
                  <ErrorMessage
                    name="location"
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <Field
                    as="select"
                    name="category"
                    id="category"
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      errors.category && touched.category
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                    }`}
                  >
                    <option value="">Select a category</option>
                    <option value="concert">Concert</option>
                    <option value="sports">Sports</option>
                    <option value="theater">Theater</option>
                    <option value="conference">Conference</option>
                    <option value="other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price ($)
                  </label>
                  <Field
                    type="number"
                    name="price"
                    id="price"
                    min="0"
                    step="0.01"
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      errors.price && touched.price
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                    }`}
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="totalTickets" className="block text-sm font-medium text-gray-700">
                  Total Tickets
                </label>
                <Field
                  type="number"
                  name="totalTickets"
                  id="totalTickets"
                  min="1"
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    errors.totalTickets && touched.totalTickets
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                  }`}
                />
                <ErrorMessage
                  name="totalTickets"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <Field
                  type="url"
                  name="imageUrl"
                  id="imageUrl"
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    errors.imageUrl && touched.imageUrl
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                  }`}
                />
                <ErrorMessage
                  name="imageUrl"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('/admin/dashboard')}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating...' : 'Create Event'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateEvent; 