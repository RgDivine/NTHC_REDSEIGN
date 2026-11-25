import { useEffect, useRef } from 'react';
import Icon from './Icon.jsx';

export default function Dialog({ open, title, onClose, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog ref={ref} className="dialog" aria-labelledby="dialog-title" onClose={onClose}
      onClick={(event) => event.target === ref.current && onClose()}>
      <div className="dialog__body">
        <button type="button" className="dialog__close" onClick={onClose} aria-label="Close"><Icon name="close" size={22} /></button>
        <h2 id="dialog-title">{title}</h2>
        {open && children}
      </div>
    </dialog>
  );
}
