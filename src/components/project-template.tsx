import Image from 'next/image';

import Waitlist from './waitlist';

interface Props {
  name: string;
  tagline: string;
  description: string;
  code: string;
  image?: string | undefined;
}

const ProjectTemplatePage: React.FC<Props> = ({
  name,
  tagline,
  description,
  code,
  image,
}) => {
  let imageEl = <div></div>;
  if (image !== '' && image !== null && image !== undefined) {
    imageEl = (
      <img
        className="w-2.5/4 right-0 top-0 hidden h-full object-contain lg:block"
        src={image!}
        alt=""
      ></img>
    );
  }
  return (
    <>
      <section className="relative py-24 md:py-0">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-6xl md:text-7xl">{name}</h2>
          <div className="-mx-4 flex  flex-wrap">
            <div className="mb-12 w-full px-4 md:mb-0 ">
              <div className="mx-auto max-w-md md:mx-0 md:py-8">
                <h3 className="font-heading mb-6 text-5xl md:text-4xl">
                  {tagline}
                </h3>
                <p className="mb-6 leading-8">{description}</p>
                <Waitlist code={code} />
                <div className="flex">
                  <a className="mr-4 inline-block" href="#">
                    {/* <img src="pstls-assets/images/applications/appstore.svg" alt=""> */}
                  </a>
                  <a className="inline-block" href="#">
                    {/* <img src="pstls-assets/images/applications/googleplay.svg" alt=""> */}
                  </a>
                </div>
              </div>
            </div>
            {imageEl}
            <div className="w-full lg:hidden">
              {/* <img src="pstls-assets/images/applications/group-phones.png" alt=""> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectTemplatePage;
