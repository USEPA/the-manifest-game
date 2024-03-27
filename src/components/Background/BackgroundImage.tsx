import darkAvif from '/images/docs-dark@30.1a9f8cbf.avif';
import darkPng from '/images/docs-dark@tinypng.1bbe175e.png?url';
import lightAvif from '/images/docs@30.8b9a76a2.avif?url';
import lightPng from '/images/docs@tinypng.d9e4dcdc.png?url';

export const BackgroundImage = () => {
  return (
    <div>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-auto flex justify-center overflow-hidden">
        <div className="flex w-[108rem] flex-none justify-end">
          <picture>
            <source srcSet={lightAvif} type="image/avif" />
            <img
              alt="light background"
              className="w-[71.75rem] max-w-none flex-none dark:hidden"
              decoding="async"
              src={lightPng}
            />
          </picture>
          <picture>
            <source srcSet={darkAvif} type="image/avif" />
            <img
              alt="dark background"
              className="hidden w-[90rem] max-w-none flex-none dark:block"
              decoding="async"
              src={darkPng}
            />
          </picture>
        </div>
      </div>
    </div>
  );
};
