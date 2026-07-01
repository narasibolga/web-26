import { Navbar } from "../(components)/navbar";

type NavbarLayoutProps = { children: React.ReactNode };

export default function NavbarLayout({ children }: NavbarLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
