export function CheckDuplicatesIndex(inputArray) {
    const addressIndexes = {}; // Object to store address and their indexes
    const outputArray = [];
    const error = {
        duplicated_error: false,
        error_arr: [],
    };

    for (let index = 0; index < inputArray.length; index++) {
        const [address] = inputArray[index].split(/[ ,=]+/); // Split by " ", ",", or "=" , extract the address part // Split the string to get the address
        if (addressIndexes[address] === undefined) {
            // If address is not already in the object, add it with the current index
            addressIndexes[address] = [index];
        } else {
            // If address is already in the object, push the current index to the array
            addressIndexes[address].push(index);
            error.duplicated_error = true;
        }
    }

    // Iterate through the object and create output entries for duplicates
    for (const address in addressIndexes) {
        if (addressIndexes[address].length > 1) {
            const indexes = addressIndexes[address]
                .map((index) => index + 1)
                .join(',');
            outputArray.push(
                `Address ${address} encountered duplicate in Line :${indexes}`
            );
        }
    }

    return { ...error, error_arr: outputArray, addressIndexes: addressIndexes };
}

export function CheckValidAmount(array) {
    const error = {
        error_arr: [],
        duplicated_error: false,
    };
    const isNumeric = (string_) => {
        // Check if the string is not empty and contains only numeric characters or spaces
        return /^[0-9\s]+$/.test(string_);
    };

    const indexesOfNonNumericAmounts = array
        .map((item, index) => {
            if (item.includes(' ')) {
                return isNumeric(item.split(' ')[1]) ? -1 : index;
            } else if (item.includes('=')) {
                return isNumeric(item.split('=')[1]) ? -1 : index;
            } else if (item.includes(',')) {
                return isNumeric(item.split(',')[1]) ? -1 : index;
            } else return index;
        })
        .filter((index) => index !== -1);
    console.log(indexesOfNonNumericAmounts);
    if (indexesOfNonNumericAmounts.length > 0) {
        const error_string = indexesOfNonNumericAmounts.map(
            (item) => `Line ${item + 1} wrong Amount`
        );
        return { ...error, error_arr: error_string };
    } else {
        return error;
    }
}

export function KeepFirstAddress(address_amount) {
    const uniqueAddresses = {};
    const resultArray = [];

    for (const item of address_amount) {
        const address = item.split(/[ ,=]+/)[0]; // Split by " ", ",", or "=" , extract the address part
        if (!uniqueAddresses[address]) {
            uniqueAddresses[address] = true;
            resultArray.push(item);
        }
    }

    return resultArray.join('\n');
}

export function CombineAddress(inputArray) {
    const addressMap = new Map();
    console.log(inputArray);
    for (const item of inputArray) {
        const [address, balance] = item.split(/[ ,=]+/); // Split by " ", ",", or "=" , extract the address part;
        if (addressMap.has(address)) {
            addressMap.set(
                address,
                addressMap.get(address) + parseInt(balance)
            );
        } else {
            addressMap.set(address, parseInt(balance));
        }
    }

    const combinedItems = [];
    for (const [address, balance] of addressMap.entries()) {
        combinedItems.push(`${address} ${balance}`);
    }

    return combinedItems.join('\n');
}
