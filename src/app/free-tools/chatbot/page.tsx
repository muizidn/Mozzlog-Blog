import FreeTools from '../FreeTools';
import BannerProject from '@/components/banner_project';

export const metadata = {
  title: 'Free ChatBot',
  description:
    'There are a lot of chatbots AI that freely available online. Choose which one you like.',
};

const chatbotServices = [
  {
    id: 1,
    name: 'Chatbot Service 1',
    description: 'Description of Chatbot Service 1.',
    link: 'https://chatbot-service-1-link.com',
  },
  {
    id: 2,
    name: 'Chatbot Service 2',
    description: 'Description of Chatbot Service 2.',
    link: 'https://chatbot-service-2-link.com',
  },
];

export default async function FreeChatBot() {
  return (
    <div className="flex w-full flex-col space-y-3">
      <div>
        There are many chatbot that you can always try to see which one fits
        your needs
      </div>
      <div className="flex justify-center">
        <BannerProject />
      </div>
      <ul>
        {chatbotServices.map((service) => (
          <li key={service.id} className="mb-4">
            <h2 className="text-xl font-semibold">
              <a href={service.link} target="_blank" rel="noopener noreferrer">
                {service.name}
              </a>
            </h2>
            <p>{service.description}</p>
          </li>
        ))}
      </ul>
      <FreeTools />
    </div>
  );
}
