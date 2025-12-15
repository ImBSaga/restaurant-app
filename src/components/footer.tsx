import { socialMediaData } from "@/constants/social-media-data";
import { exploreData } from "@/constants/explore-data";
import { helpData } from "@/constants/help-data";

export function Footer() {
  return (
    <footer className="w-full border-t border-neutral-300 px-4 py-10 flex flex-col gap-6 bg-neutral-950 md:grid md:grid-cols-3 md:px-30 md:py-20 md:gap-0">
      {/* Content */}
      <div className="flex flex-col gap-4 md:max-w-95">
        <div className="flex flex-col gap-5.5">
          <div className="w-37.25 h-10.5">
            <img src="/icons/icon-logo-text-white.svg" alt="Logo" />
          </div>
          <p className="text-sm text-neutral-25 font-regular">
            Enjoy homemade flavors & chef’s signature dishes, freshly prepared
            every day. Order online or visit our nearest branch.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="text-sm text-neutral-25 font-bold">
            Follow on Social Media
          </h3>
          <div className="flex gap-3">
            {socialMediaData.map((item) => (
              <img
                key={item.alt}
                src={item.src}
                alt={item.alt}
                className="w-10 h-10"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="grid grid-cols-2 md:col-span-2 gap-4 text-sm text-neutral-25">
        <div className="flex flex-1 flex-col gap-4">
          <h3 className="font-extrabold">Explore</h3>

          {exploreData.map((item) => (
            <p className="font-regular" key={item.text}>
              {item.text}
            </p>
          ))}
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <h3 className="font-extrabold">Help</h3>
          {helpData.map((item) => (
            <p className="font-regular" key={item.text}>
              {item.text}
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
}
