import type { Screens } from "@types";
import { game } from "game";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

export const Loading = ({ setLoading }: { setLoading: Dispatch<SetStateAction<boolean>> }) => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            if (progress >= 100) {
                return clearInterval(interval);
            }

            setProgress(prgs => prgs + 1);
        }, 30);

        setTimeout(() => {
            setLoading(false)
        }, 3500);

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <box
            width={'100%'}
            top='center'
        >
            <box bg="white" height={2} width={100}>
                <text>Loading...</text>
            </box>
            <progressbar
                align="center"
                height={1}
                width={'95%'}
                filled={progress}
                style={{ bar: { bg: 'blue' } }}
                onComplete={() => { 
                }}
            />
        </box>
    )
}