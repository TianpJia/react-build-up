import { Button } from "antd";
import { useCallback, useMemo, useState } from "react";

const openNewWindow = () => {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const windowWidth = 800; // 新窗口的宽度
    const windowHeight = 600; // 新窗口的高度

    const left = screenWidth > windowWidth ? screenWidth - windowWidth : 0;
    const top = screenHeight > windowHeight ? screenHeight - windowHeight : 0;

    const newWindow = window.open('https://www.baidu.com/', '_blank', `width=${windowWidth}, height=${windowHeight}, left=${-left}`);
    // 在这里添加你想要在新窗口中显示的内容
};


const CountDemo = () => {
    const [count, setCount] = useState(0);
    const [text, setText] = useState("");

    const calculateExpensiveValue = useMemo(() => {
        console.log("Calculating expensive value...");
        let sum = 0;
        for (let i = 0; i < count * 10000000; i++) {
            sum += i;
        }
        return sum;
    }, [count]);

    const handleButtonClick = useCallback(() => {
        setCount(count + 1);
    }, [count]);

    const handleTextChange = useCallback((event: any) => {
        setText(event.target.value);
    }, []);

    const open = async () => {
        const screenDetails = await (window as any).getScreenDetails();
        const primaryScreen = screenDetails.screens.find((s: any) => s.isPrimary);
        const otherScreen = screenDetails.screens.find((s: any) => s !== primaryScreen);
        window.open(
            "https://www.baidu.com/",
            "_blank",
            `toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no` +
            `left=${otherScreen.availLeft},` +
            `top=${otherScreen.availTop},` +
            `width=${otherScreen.availWidth},` +
            `height=${otherScreen.availHeight}`
        );
    };

    return (
        <div>
            <Button onClick={openNewWindow}>open</Button>
            <p>Count: {count}</p>
            <p>Expensive Value: {calculateExpensiveValue}</p>
            <button onClick={handleButtonClick}>Increment Count</button>
            <input type="text" value={text} onChange={handleTextChange} />
        </div>
    );
};

export default CountDemo;
