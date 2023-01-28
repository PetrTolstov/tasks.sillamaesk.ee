import styles from "./dateinput.module.css";

export type DateInputProps = {
    placeholder: string;
    onChange: (value: string) => void;
    value?: string;
    
};

export default function DateInput({
    placeholder,
    onChange,
    value = "",
}: DateInputProps) {
    return (
        
        <div className={styles.container}>
            <label htmlFor={placeholder} className={styles.inp}>
                {placeholder}
            </label>
            <input
                id={placeholder}
                placeholder="&nbsp;"
                type={'date'}
                onChange={(e) => {
                    onChange(e.currentTarget.value);
                }}
                value={value}
            />
            <span className={styles.label}></span>
            <span className={styles.focus_bg}></span>
        </div>
    );
}
