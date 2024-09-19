import React, { useState } from 'react';

interface OptionsMenuProps {
  id: number;
  onNewClick: () => void;
  onDeleteClick: (id: number) => void;
}

const OptionsMenu: React.FC<OptionsMenuProps> = ({ id, onNewClick, onDeleteClick }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleButtonClick = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="actions-trigger text-nowrap">
      <div className="header-links dropdown">
        <button
          className="br-button circle secondary"
          type="button"
          id="button-dropdown"
          title="Ver opções"
          data-toggle="dropdown"
          data-target="target01-98928"
          aria-label="Opções"
          aria-haspopup="true"
          aria-live="polite"
          data-visible="true"
          aria-expanded={showOptions}
          aria-controls="target01-98928"
          tabIndex={0}
          onClick={handleButtonClick}
        >
          <i className="fas fa-ellipsis-v fa-chevron-up" aria-hidden="true"></i>
        </button>
        {showOptions && (
          <div
            className="br-list"
            id="target01-98928"
            role="menu"
            aria-labelledby="button-dropdown"
            aria-hidden="false"
            data-dropdown
            style={{ zIndex: 9999 }}
          >
            <div className="header">
              <div className="title">Opções</div>
            </div>
            <button className="br-item" onClick={()=> onNewClick()} onBlur={handleButtonClick}>
              <i className="fas fa-plus"></i>&nbsp;&nbsp;Novo
            </button>
            <span className="br-divider vertical mx-half mx-sm-1"></span>
            {id > 0 && (
              <button className="br-item" onClick={() => onDeleteClick(id)} onBlur={handleButtonClick}>
                <i className="fas fa-minus"></i>&nbsp;&nbsp;Excluir
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OptionsMenu;
