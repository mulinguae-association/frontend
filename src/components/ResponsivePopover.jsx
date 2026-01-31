import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Popover from "./Popover";
import Drawer from "./Drawer";

const MOBILE_BREAKPOINT = 768;

const ResponsivePopover = ({ open, onClose, children, title }) => {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < MOBILE_BREAKPOINT,
  );

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent page scroll when overlay is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (isMobile) {
    return (
      <Drawer isOpen={open} onClose={onClose} title={title}>
        {children}
      </Drawer>
    );
  }
  return (
    <Popover isOpen={open} onClose={onClose} title={title}>
      {children}
    </Popover>
  );
};

ResponsivePopover.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};
export default ResponsivePopover;
