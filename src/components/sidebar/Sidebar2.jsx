import Image from "next/image";
import "./sidebar.css";
import Logo from "../../../public/assets/icons/sf-logo.svg";
import { BiExit } from "react-icons/bi";
import { IoHome, IoLocationOutline, IoQrCodeSharp } from "react-icons/io5";
import { VscSignOut } from "react-icons/vsc";
import HomeIcon from "../../../public/assets/icons/home-icon";
import UsersIcon from "../../../public/assets/icons/users-icon";
import LocationIcon from "../../../public/assets/icons/location-icon";
import QrIcon from "../../../public/assets/icons/qr-icon";
import SecurityIcon from "../../../public/assets/icons/security-icon";
import SignoutIcon from "../../../public/assets/icons/signout-icon";

function Sidebar() {
  const SidebarData = [
    {
      title: 'Home',
      icon: HomeIcon,
      href: '/'
    },
    {
      title: 'Sign Out',
      icon: SignoutIcon,
      href: '/sign out'
    },
  ]
  return (
    <>
      <nav className="sidebar">
        <div className="sidebar-top-wrapper">
          <div className="sidebar-top">
            <a href="/" className="logo__wrapper">
              <Image
                src={Logo}
                alt="Logo"
                width={100}
                height={100}
              />
              <span
                style={{
                  color: "white",
                }}
                className="hide logo-title"
              >
                SF Secure
              </span>
            </a>
          </div>
        </div>
        <div className="sidebar-links-wrapper">
          {SidebarData.map((data,i)=>(
            <div key={i} className='sidebar-link'>
              <data.icon />
              <a className='nav-title' href={data.href}>{data.title}</a>
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
