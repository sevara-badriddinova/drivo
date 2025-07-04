import Image from "next/image";
const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-60 border-b">
      <nav className="mx-auto px-4 py-4 flex items-center justify-between">
          <Image
            src={"/logo.png"}
            alt="DriVo Logo"
            width={200}
            height={60}
            className="h-16 w-auto object-contain"
          />
      </nav>
    </header>
  );
};

export default Header;
