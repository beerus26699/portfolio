const SaveIcon = ({ ...props }) => {
    return (
        <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="200px"
            width="200px"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path fill="none" d="M0 0h24v24H0V0z"></path>
            <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67 2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2v9.67z"></path>
        </svg>
    );
};

export default SaveIcon;
