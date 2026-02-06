import PropTypes from "prop-types";
import Modal from "../Modal";
import Drawer from "../Drawer";
import useWindowResize from "../../../hooks/useWindowResize";

const MOBILE_BREAKPOINT = 768;

const ResponsiveModal = ({ open, onClose, title, children, ...props }) => {
  const { width } = useWindowResize();
  const isMobile = width < MOBILE_BREAKPOINT;

  if (isMobile) {
    return (
      <Drawer isOpen={open} onClose={onClose} title={title} {...props}>
        {children}
      </Drawer>
    );
  }
  return (
    <Modal open={open} onClose={onClose} title={title} {...props}>
      {children}
    </Modal>
  );
};

ResponsiveModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default ResponsiveModal;
