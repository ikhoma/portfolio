import { useNavigate } from 'react-router-dom';
import backIcon from '../assets/icons/back.svg';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="fixed right-8 top-8 z-50 flex h-[64px] w-[64px] items-center justify-center rounded-[72px] transition-[background-color,box-shadow] duration-200"
      style={{
        border: '2px solid #ffffff',
        boxShadow: 'none',
      }}
      aria-label="Go back"
      onMouseEnter={(event) => {
        event.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
        event.currentTarget.style.boxShadow = '0px 4px 30px 0px rgba(255, 255, 255, 0.15)';
        event.currentTarget.style.border = 'none';
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.background = 'transparent';
        event.currentTarget.style.boxShadow = 'none';
        event.currentTarget.style.border = '2px solid #ffffff';
      }}
    >
      <img src={backIcon} alt="" aria-hidden="true" className="h-[24px] w-[24px] shrink-0" />
    </button>
  );
}
