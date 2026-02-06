import React, { useState } from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookMessengerIcon,
  TelegramShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
  TelegramIcon,
  TwitterIcon,
  FacebookMessengerShareButton,
} from "react-share";
import ResponsiveModal from "../ResponsiveModal";
import { FaShareAlt, FaLink } from "react-icons/fa";
import "./ShareButton.scss";

const platforms = [
  {
    name: "Facebook",
    Button: FacebookShareButton,
    Icon: FacebookIcon,
  },
  {
    name: "LinkedIn",
    Button: LinkedinShareButton,
    Icon: LinkedinIcon,
  },
  {
    name: "WhatsApp",
    Button: WhatsappShareButton,
    Icon: WhatsappIcon,
  },
  {
    name: "Messenger",
    Button: FacebookMessengerShareButton,
    Icon: FacebookMessengerIcon,
  },
  {
    name: "Telegram",
    Button: TelegramShareButton,
    Icon: TelegramIcon,
  },
  {
    name: "Twitter",
    Button: TwitterShareButton,
    Icon: TwitterIcon,
  },
];

const ShareButton = ({ url, title, description }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <button
        className="share-icon-btn"
        onClick={() => setOpen(true)}
        title="Share"
      >
        <FaShareAlt size={20} />
      </button>
      <ResponsiveModal
        open={open}
        onClose={() => setOpen(false)}
        title="Share Blog"
      >
        <div className="share-modal-content">
          <div className="share-links">
            {platforms.map(({ name, Button, Icon }) => (
              <Button
                quote={
                  title
                    ? `${title} | Mulinguae Blog`
                    : "Check out this blog on Mulinguae!"
                }
                hashtag="#MulinguaeBlog"
                key={name}
                url={url}
                title={title}
              >
                <Icon size={40} round />
              </Button>
            ))}
          </div>
          <div className="link-copy-section">
            <div className="link-box">{url}</div>
            {!copied && (
              <button
                className="copy-link-btn"
                onClick={handleCopy}
                title="Copy link"
              >
                <FaLink size={30} />
              </button>
            )}
            {copied && <div className="copy-feedback">Link copied!</div>}
          </div>
        </div>
      </ResponsiveModal>
    </>
  );
};

export default ShareButton;
