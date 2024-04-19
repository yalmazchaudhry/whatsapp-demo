import leftArrow from '../../assets/icons/left-arrow.png';
import user from '../../assets/icons/user.png';
import videCall from '../../assets/icons/video-call.png';
import call from '../../assets/icons/call.png';
import dotsMenu from '../../assets/icons/dots-menu.png';
import './index.scss';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  return (
    <>
      <header className="bg-primary flex items-center gap-2 p-4 justify-between">
        <img
          src={leftArrow}
          width={8}
          height={8}
          alt="back"
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <img
          src={user}
          width={16}
          height={16}
          alt="user"
          className="cursor-pointer"
        />
        <div className="flex flex-column">
          <p className="text-11 color-white m-0 roboto-medium">Test User</p>
          <p className="text-8 color-white m-0 roboto-regular">
            last seen today at 05:25
          </p>
        </div>
        <div className="flex items-center gap-10">
          <img
            src={videCall}
            width={8}
            height={8}
            alt="videoCall"
            className="cursor-pointer"
          />
          <img
            src={call}
            width={8}
            height={8}
            alt="call"
            className="cursor-pointer"
          />
          <img
            src={dotsMenu}
            width={2}
            height={8}
            alt="menu"
            className="cursor-pointer"
          />
        </div>
      </header>
    </>
  );
}

export default Header;
