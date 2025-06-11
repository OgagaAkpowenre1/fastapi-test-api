import './textBox.css'

const TextBox = ({className}) => {
    return (
        <div className={`text-box ${className}`}>
        <textarea></textarea>
        </div>
    )
}

export default TextBox;