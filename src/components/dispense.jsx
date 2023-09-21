import { useRef, useState } from 'react';

import TextAreaWithLineNumbers from './textarea-lines';

import {
    CheckDuplicatesIndex,
    CheckValidAmount,
    CombineAddress,
    KeepFirstAddress,
} from '../utility/validations';

function _checkValidations(array) {
    let error_valid_amount = {
        error_arr: [],
        duplicated_error: false,
    };
    error_valid_amount = CheckValidAmount(array);
    if (error_valid_amount.error_arr.length > 0) return error_valid_amount;

    error_valid_amount = CheckDuplicatesIndex(array);
    return error_valid_amount;
}

const Dispense = () => {
    const textarea_reference = useRef('');
    const [address, setAddress] = useState('');
    const [address_amount, setAddressAmount] = useState('');
    const [error, setError] = useState({
        error_arr: [],
        duplicated_error: false,
        addressIndexes: {},
        success: false,
    });

    function onSubmit() {
        const address_array =
            textarea_reference.current.innerHTML.split(/\n/gm);

        setAddressAmount(address_array);
        const validation_data = _checkValidations(address_array);
        if (validation_data.error_arr.length > 0) {
            return setError(validation_data);
        }
        setError({ ...validation_data, success: true });
    }

    function removeDuplicates(type) {
        if (type === 'keep') {
            const new_address = KeepFirstAddress(address_amount);
            setAddress(new_address);
        } else if (type === 'combine') {
            const new_address = CombineAddress(address_amount);
            setAddress(new_address);
        }
        setError({
            error_arr: [],
            duplicated_error: false,
            addressIndexes: {},
        });
    }

    return (
        <>
            <div className="flex flex-col gap-5">
                <TextAreaWithLineNumbers
                    onChange={setAddress}
                    value={address}
                    ref={textarea_reference}
                />

                {error.duplicated_error ? (
                    <>
                        <div className="flex flex-row justify-between text-danger">
                            <p>Duplicated</p>
                            <div className="flex cursor-pointer flex-row gap-1">
                                <p onClick={() => removeDuplicates('keep')}>
                                    Keep the first One
                                </p>
                                <p>{'|'}</p>
                                <p onClick={() => removeDuplicates('combine')}>
                                    Combine balance
                                </p>
                            </div>
                        </div>
                    </>
                ) : null}

                {error.error_arr.length > 0 ? (
                    <div className="border-2 border-danger p-3">
                        {error.error_arr.map((error_string, index) => (
                            <p key={index} className="text-danger">
                                {error_string}
                            </p>
                        ))}
                    </div>
                ) : null}

                {error.success ? (
                    <div className="border-2 border-success p-3 font-bold">
                        <p className="text-16 text-success">
                            Validations Passed
                        </p>
                    </div>
                ) : null}

                <button
                    onClick={onSubmit}
                    className={'h-14 w-full bg-success text-white'}
                >
                    Submit
                </button>
            </div>
        </>
    );
};

export default Dispense;
