import style from '../buttons/buttons.module.css';

export default function Buttons({ title, variant, onClick }) {
    const className = 
        variant === 'info' ? style.buttonInfo :
        variant === 'update' ? style.buttonUpdate :
        variant === 'confirmacao' ? style.buttonConfirmacao :
        variant === 'delete' ? style.buttonDelete :
        '';

    return (
        <button className={`${style.button} ${className}`} onClick={onClick}>
            {title}
        </button>
    );
}
