import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  TikTok,
} from "../../public/svg/social/IconSocial";

export default function renderSocialMedia({ social }) {
  /**
   * Render an icon representing the specified social media platform
   * @param {string} solcial - The social media platform to render (FB, IT, TW)
   * @returns {React.Element} - The icon element of the platform
   */
  const renderSolcialMedia = (solcial) => {
    switch (solcial) {
      case "FB":
        return <Facebook className="fn__svg" />;
      case "IT":
        return <Instagram className="fn__svg" />;
      case "TW":
        return <Twitter className="fn__svg" />;
      case "YT":
        return <Youtube className="fn__svg" />;
      case "TT":
        return <TikTok className="fn__svg" />;
      case "LK":
        return <Linkedin className="fn__svg" />;
      default:
        return null;
    }
  };

  return <>{renderSolcialMedia(social)}</>;
}
