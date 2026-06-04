import { InputCheckbox } from "./styles";

interface CheckboxInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export default function CheckboxInput({ type, ...otherProps } : CheckboxInputProps) {
    return (
        <InputCheckbox type="checkbox" {...otherProps} />
    );
}