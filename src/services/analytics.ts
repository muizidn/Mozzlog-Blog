import axios from 'axios';

export const Analytics = {
  identify: (id: string) => {
  },
  alias: (id: string) => {
  },
  track: (name: string, props?: { [key: string]: any }) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_ANALYTICS_API_URL}/api/track`;

    const eventData = {
      event: name,
      properties: props || {},
    };

    axios.post(apiUrl, eventData)
      .then((response) => {
        console.log('Event tracked successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error tracking event:', error);
      });
  },
};
