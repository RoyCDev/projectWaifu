function Input({ className, leftBorder, name, label, ...rest }) {
    const handleDragDrop = (e) => {
        e.dataTransfer.effectAllowed = "none"
        e.preventDefault();
    }

    return (
        <div className={className}>
            <span className={leftBorder ? "border-left" : undefined}>
                <label htmlFor={name}>{label}</label>
            </span>
            <input
                name={name}
                id={name}
                onDragStart={handleDragDrop}
                onDrop={handleDragDrop}
                autoComplete="off"
                required
                {...rest}
            />
        </div>
    )
}

export default Input;