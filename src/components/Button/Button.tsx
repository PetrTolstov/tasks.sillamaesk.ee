import { PropsWithChildren } from "react";
import styles from "./button.module.css";

export enum Size {
    Small = 1,
    Medium,
    Large,
}

type ButtonProps = {
    action: () => void;
    border?: boolean;
    filled?: boolean;
    isSubmit?: boolean;
    isDisabled?: boolean;
    size?: Size;
};

export default function Button({
    children,
    action,
    border = false,
    filled = false,
    isSubmit = false,
    isDisabled = false,
    size = Size.Small,
}: ButtonProps & PropsWithChildren) {
    let style = [styles.button];
    switch (size) {
        case Size.Medium:
            style.push(styles.mediumSize);
            break;
        case Size.Large:
            style.push(styles.largeSize);
    }

    if (border) {
        style.push(styles.border);
    }
    if (filled) {
        style.push(styles.filled);
    }
    if (isDisabled) {
        style.push(styles.disabled);
    }

    return (
        <button
            disabled={isDisabled}
            type={isSubmit ? "submit" : undefined}
            className={style.join(" ")}
            onClick={action}
        >
            {children}
        </button>
    );
}
