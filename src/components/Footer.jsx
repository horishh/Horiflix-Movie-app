import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-2 mt-4 shadow-[0px_-6px_20px_-5px_rgba(0,_0,_0,_0.1)]">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm mb-2 md:mb-0">
          &copy; {new Date().getFullYear()} Developed by{" "}
          <span className="font-semibold">Horie Kyazimova</span>
        </p>
        <div className="flex mt-2 space-x-4">
          <a
            href="https://github.com/horishh"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#f59e0b] transition-colors"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://linkedin.com/in/horie-kyazimova-301968238"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#f59e0b] transition-colors"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
