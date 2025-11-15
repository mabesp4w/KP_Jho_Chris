export default function SearchInput({ placeholder = 'Cari...', value, onChange, className = '', ...props }) {
    return (
        <div className={`form-control relative w-full ${className}`.trim()}>
            <input type="text" placeholder={placeholder} className="input-bordered input w-full pl-8" value={value} onChange={onChange} {...props} />
            <div
                className="pointer-events-none absolute top-0 left-2 z-10 flex h-full items-center justify-center"
                style={{ visibility: 'visible', opacity: 1 }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-base-content/60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{ display: 'block', visibility: 'visible', opacity: 1 }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
        </div>
    );
}
