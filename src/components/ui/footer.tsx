
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaTiktok,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  const galleryImages = [
    { src: "/images/gallery1.png", alt: "Natural Hair" },
    { src: "/images/gallery2.png", alt: "Goddess Braids" },
    { src: "/images/gallery3.png", alt: "Wigs" },
    { src: "/images/gallery4.png", alt: "Pixie Cut" },
    { src: "/images/gallery5.png", alt: "Curly Perm" },
    { src: "/images/gallery6.png", alt: "Knotless Braids" },
  ];

  return (
    <footer className="w-full bg-neutral-900 text-white py-16 px-4 sm:px-8 lg:px-6">
      <div className="w-full grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">CROWN ROOM</h2>

          <p className="flex items-start gap-3 my-2">
            <FaMapMarkerAlt className="w-6 h-6" aria-hidden="true" />
            1st floor, Soin Arcade, Westlands
          </p>

          <p className="flex items-start gap-3 my-2">
            <FaPhoneAlt className="w-5 h-5" aria-hidden="true" />
            (+254) 701 907 187
          </p>

          <p className="flex items-start gap-3 my-2">
            <FaEnvelope className="w-5 h-5" aria-hidden="true" />
            crownroom@gmail.com
          </p>

          <p className="mt-5 font-bold">Open Hours</p>
          <p>Mon–Sat: 6:00AM–10:00PM</p>
          <p>Sun: 8:00AM–7:00PM</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {["About", "Our Gallery", "Our Team", "Articles", "Contact Us"].map(
              (label) => (
                <li
                  key={label}
                  className="hover:text-pink-400 transition-colors duration-200"
                >
                  <Link href="#">{label}</Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-1 text-sm">
            {[
              "Hair Dressing",
              "Hair Extensions",
              "Nails",
              "Natural Hair",
              "Bridal Package",
              "Massage",
              "Barbering",
              "Human Hair Sales",
            ].map((service) => (
              <li
                key={service}
                className="hover:pl-1 transition-all duration-200 flex gap-3 items-center"
              >
                <span className="w-5 h-5 flex items-center justify-center bg-pink-500 text-white text-xs rounded-full">
                  ✓
                </span>
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* Gallery & Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Gallery</h3>
          <div className="grid grid-cols-3 mb-6 gap-2">
            {galleryImages.map((img, i) => (
              <Image
                key={i}
                src={img.src}
                alt={img.alt}
                width={400}
                height={400}
                className="w-24 md:w-full h-auto object-cover rounded-md hover:scale-105 transition"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 33vw"
                priority={false}
              />
            ))}
          </div>

          <div className="flex flex-wrap justify-start md:justify-center gap-4">
            {[
              { icon: <FaFacebookF />, color: "hover:text-blue-500" },
              { icon: <FaInstagram />, color: "hover:text-pink-500" },
              { icon: <FaTwitter />, color: "hover:text-sky-400" },
              { icon: <FaTiktok />, color: "hover:text-white" },
              { icon: <FaWhatsapp />, color: "hover:text-green-500" },
            ].map((social, i) => (
              <a
                key={i}
                href="#"
                className={`text-xl transition-transform duration-200 transform hover:scale-125 ${social.color}`}
                aria-label="social link"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 text-sm text-gray-400 px-6 md:text-center">
        &copy; 2025 CrownRoom Hair Lounge. All rights reserved. Built by{" "}
        <span className="text-white font-medium">Ralphie Designs</span>.
      </div>
    </footer>
  );
}
