import style from '../buttons/buttons.module.css';

export default function Buttons({ title, variant, onClick, className: customClass }) {
    const className = 
        variant === 'info' ? style.buttonInfo :
        variant === 'update' ? style.buttonUpdate :
        variant === 'confirmacao' ? style.buttonConfirmacao :
        variant === 'delete' ? style.buttonDelete :
        '';

    return (
        <button 
          className={`${style.button} ${className} ${customClass}`} 
          onClick={onClick}
        >
            {title}
        </button>
    );
}
