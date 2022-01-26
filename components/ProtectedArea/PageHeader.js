function PageHeader({ children }) {
  return (
    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl flex items-center">
      {children}
    </h2>
  );
}

export default PageHeader;
