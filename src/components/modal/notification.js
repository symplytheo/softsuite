import React from "react";
import Modal from ".";
import s from "./modal.module.scss";
import Button from "../button";

const NotificationModal = ({
  title,
  icon,
  subtitle,
  action,
  actionText,
  showCancel,
  isOpen,
  onClose,
  actionColor = "secondary",
}) => {
  const Icon = icon;
  return (
    <Modal maxWidth={434} isOpen={isOpen} onClose={onClose}>
      <div className={s.notification}>
        {icon && <Icon height={60} width={60} />}
        <h5>{title}</h5>
        {subtitle && <p>{subtitle}</p>}
        <div>
          {showCancel && (
            <Button mode="outlined" size="large" color="error" onClick={onClose}>
              Cancel
            </Button>
          )}
          <Button size="large" color={actionColor} fullWidth={true} onClick={action}>
            {actionText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default NotificationModal;
