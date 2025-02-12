import Image from 'next/image';
import './sidebar.css';
import Logo from '../../../public/assets/icons/sf-logo.svg';
import HomeIcon from '../../../public/assets/icons/home-icon';
import UsersIcon from '../../../public/assets/icons/users-icon';
import LocationIcon from '../../../public/assets/icons/location-icon';
import QrIcon from '../../../public/assets/icons/qr-icon';
import SignoutIcon from '../../../public/assets/icons/signout-icon';

function Sidebar() {
  const SidebarData = [
    {
      title: 'Home',
      icon: HomeIcon,
      href: '/',
    },
    {
      title: 'Users',
      icon: UsersIcon,
      href: '/users',
    },
    {
      title: 'Locations',
      icon: LocationIcon,
      href: '/location',
    },
    {
      title: 'QR Codes',
      icon: QrIcon,
      href: '/qrcode',
    },
    // {
    //   title: 'AI Allocations',
    //   icon: SecurityIcon,
    //   href: '/allocations'
    // },
    {
      title: 'Sign Out',
      icon: SignoutIcon,
      href: '/sign out',
    },
  ];
  return (
    <>
      <nav className="sidebar">
        <div className="sidebar-top-wrapper">
          <div className="sidebar-top">
            <a href="/" className="logo__wrapper">
              <Image src={Logo} alt="Logo" width={100} height={100} />
              <span
                style={{
                  color: 'white',
                }}
                className="hide logo-title"
              >
                SF Secure
              </span>
            </a>
          </div>
        </div>
        <div className="sidebar-links-wrapper">
          {SidebarData.map((data, i) => (
            <div key={i} className="sidebar-link">
              <data.icon />
              <a className="nav-title" href={data.href}>
                {data.title}
              </a>
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
