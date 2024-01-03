function Input({ ...rest }) {
    const handleDragDrop = (e) => {
        e.dataTransfer.effectAllowed = "none"
        e.preventDefault();
    }
    return (
        <input required
            onDragStart={handleDragDrop}
            onDrop={handleDragDrop}
            autoComplete="off"
            {...rest}
        />
    )
}

export default Input;