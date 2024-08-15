import { useState, useEffect } from 'react'

export function timeStamp2Time(timeStamp, format) {
    if (typeof timeStamp != 'number') timeStamp = Number(timeStamp)

    if (String(timeStamp).length == 10) {
        timeStamp = Number(timeStamp + '000')
    }

    var date = new Date(timeStamp)

    return format.replace(/ms/g, ('00' + date.getMilliseconds()).slice(-3))
        .replace(/s/g, ('0' + date.getSeconds()).slice(-2))
        .replace(/m/g, ('0' + date.getMinutes()).slice(-2))
        .replace(/h/g, ('0' + date.getHours()).slice(-2))
        .replace(/D/g, ('0' + date.getDate()).slice(-2))
        .replace(/M/g, ('0' + (date.getMonth() + 1)).slice(-2))
        .replace(/Y/g, String(date.getFullYear()))
}

export function getEleDistanceToPageLeft(element) {
    var distance = 0;
    while (element) {
        distance += element.offsetLeft;
        element = element.offsetParent;
    }
    return distance;
}

export function convertToBinary(file) {
    return new Promise((resolve, reject) => {
        if (file) {
            const reader = new FileReader();

            reader.onload = function (event) {
                const binaryString = event.target.result;
                const blob = new Blob([binaryString], { type: 'application/octet-stream' });

                resolve(blob);
            };

            // 以ArrayBuffer格式读取文件内容
            reader.readAsArrayBuffer(file);
        }
    })

}


export function copyText(text) {
    return new Promise((resolve, reject) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                resolve(1)
            })
            .catch(err => {
                resolve(0)
            });
    })
}


/* react utils */
export function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debouncedValue;
}
