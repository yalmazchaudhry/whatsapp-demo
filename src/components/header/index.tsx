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
      <header className="bg-primary flex items-center gap-8 px-8 justify-between">
        <div className=" flex items-center gap-10  ">
          <img
            src={leftArrow}
            width={16}
            height={16}
            alt="back"
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <img
            src={user}
            width={35}
            height={35}
            alt="user"
            className="cursor-pointer"
          />
          <div className="flex flex-column">
            <p className="text-16 color-white m-0 roboto-medium">Test User</p>
            <p className="text-11 color-white m-0 roboto-regular">
              last seen today at 05:25
            </p>
          </div>
        </div>
        <div
          className="flex items-center justify-between gap-10"
          style={{ width: '30%' }}
        >
          <img
            src={videCall}
            width={20}
            height={20}
            alt="videoCall"
            className="cursor-pointer"
          />
          <img
            src={call}
            width={20}
            height={20}
            alt="call"
            className="cursor-pointer"
          />
          <img
            src={dotsMenu}
            width={5}
            height={20}
            alt="menu"
            className="cursor-pointer"
          />
        </div>
      </header>
    </>
  );
}

export default Header;
