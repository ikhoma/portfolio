import backIcon from '../assets/icons/back.svg?url';

export default function BackButton() {
  return <a href="/" data-case-back className="case-back" aria-label="Go back">
    <img src={backIcon} alt="" aria-hidden="true" width="24" height="24" />
  </a>;
}
