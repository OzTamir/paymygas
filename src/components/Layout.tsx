import { Link, Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white min-w-screen">
      {/* Header with navigation */}
      <header className="sticky top-0 z-10 bg-gray-950/90 backdrop-blur-md shadow-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Link to="/" className="flex items-center">
              <div className="bg-blue-600 text-white p-2 rounded-lg mr-3 flex items-center justify-center">
                <span className="text-xl">⛽</span>
              </div>
              <span className="text-2xl font-bold text-white">PayMyGas</span>
            </Link>
          </div>

          <nav className="flex items-center space-x-1">
            <NavLink to="/" current={location.pathname}>
              Home
            </NavLink>
            <NavLink to="/examples" current={location.pathname}>
              Examples
            </NavLink>
            <NavLink to="/docs" current={location.pathname}>
              Docs
            </NavLink>
            <NavLink
              to="https://github.com/oztamir/paymygas"
              current={location.pathname}
              external
            >
              GitHub
            </NavLink>
            <Link
              to="https://paymygas.xyz/docs"
              className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between gap-8 max-w-screen-lg mx-auto">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                PayMyGas
              </h3>
              <p className="text-gray-400">
                A simple, elegant way for builders and creators to accept crypto
                donations.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                Resources
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/examples" className="hover:text-blue-400">
                    Examples
                  </Link>
                </li>
                <li>
                  <a
                    href="https://paymygas.xyz/docs"
                    className="hover:text-blue-400"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/oztamir/paymygas"
                    className="hover:text-blue-400"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} PayMyGas. Built with ❤️ by{" "}
              <a
                href="https://oztamir.xyz"
                className="hover:text-blue-400 font-bold underline"
              >
                oztamir.eth
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Navigation link component
const NavLink = ({
  to,
  children,
  current,
  external = false,
}: {
  to: string;
  children: React.ReactNode;
  current: string;
  external?: boolean;
}) => {
  const isActive = current === to;

  if (external) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200
          ${
            isActive
              ? "bg-gray-800 text-blue-400"
              : "text-gray-300 hover:bg-gray-800 hover:text-white"
          }`}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200
        ${
          isActive
            ? "bg-gray-800 text-blue-400"
            : "text-gray-300 hover:bg-gray-800 hover:text-white"
        }`}
    >
      {children}
    </Link>
  );
};

export default Layout;
