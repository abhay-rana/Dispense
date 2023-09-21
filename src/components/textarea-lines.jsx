import React, { useEffect, useState } from 'react';

const TextAreaWithLineNumbers = React.forwardRef(
    ({ value, onChange }, reference) => {
        const [numberOfLines, setNumberOfLines] = useState(1);
        const textareaReference = reference;

        const handleInput = () => {
            const lines = textareaReference.current.value.split('\n').length;
            setNumberOfLines(lines);
            onChange(textareaReference.current.value); // Call the onChange prop to update the parent component's state
        };

        useEffect(() => {
            handleInput();
        }, [value]);

        useEffect(() => {
            const textarea = textareaReference.current;
            textarea.addEventListener('input', handleInput);

            return () => {
                textarea.removeEventListener('input', handleInput);
            };
        }, []);

        const handleTabKeyPress = (event) => {
            if (event.key === 'Tab') {
                event.preventDefault();
                const { selectionStart, selectionEnd, value } =
                    textareaReference.current;
                const newValue =
                    value.substring(0, selectionStart) +
                    '\t' +
                    value.substring(selectionEnd);

                const newPosition = selectionStart + 1;
                textareaReference.current.setSelectionRange(
                    newPosition,
                    newPosition
                );
                onChange(newValue); // Call the onChange prop to update the parent component's state
            }
        };

        const renderLineNumbers = () => {
            return Array.from({ length: numberOfLines }).map((_, index) => (
                <div key={index} className="line-number">
                    {index + 1}
                </div>
            ));
        };

        return (
            <div className="flex gap-10 rounded-md bg-gray-900 p-5">
                <div className="mr-2 flex h-[350px] flex-col items-end text-white">
                    {renderLineNumbers()}
                </div>
                <textarea
                    ref={textareaReference}
                    value={value}
                    onChange={(event) => {
                        onChange(event.target.value); // Call the onChange prop to update the parent component's state
                    }}
                    onKeyDown={handleTabKeyPress}
                    className="min-w-[500px] resize-none border-0 bg-gray-900 text-white outline-none"
                ></textarea>
            </div>
        );
    }
);

TextAreaWithLineNumbers.displayName = 'TextAreaWithLineNumbers';
export default TextAreaWithLineNumbers;
