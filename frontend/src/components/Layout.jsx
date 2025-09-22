import NavBar from "./NavBar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* NavBar at the top */}
      <NavBar />

      {/* Main content */}
      <main className="p-6">{children}</main>
    </div>
  );
}
