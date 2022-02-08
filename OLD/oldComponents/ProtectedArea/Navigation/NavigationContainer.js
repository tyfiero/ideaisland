import MobileNavBar from "./MobileNavBar";
import DesktopSideBar from "./DesktopSideBar";
import MobileSideBar from "./MobileSideBar";

function NavigationContainer({ children }) {
  return (
    <div>
      <MobileSideBar />

      <DesktopSideBar />
      <div className="md:pl-64 flex flex-col flex-1">
        <MobileNavBar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

export default NavigationContainer;
