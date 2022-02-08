function MainLayout({ children }) {
  return (
    // Set max width and paddings for all content on the pages in the protected area
    <main className="max-w-2xl lg:max-w-5xl xl:max-w-6xl mx-auto pt-10 sm:pt-12 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8 bg-white">
      {children}
    </main>
  );
}

export default MainLayout;
