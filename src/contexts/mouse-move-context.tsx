import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    useEffect,
    ReactNode,
} from 'react';

type MouseMoveProviderProps = {
    children: ReactNode;
};

type MouseMoveState = {
    mouseDirection: (main?: number) => {
        x: number;
        y: number;
    };
    mouseReverse: (main?: number) => {
        x: number;
        y: number;
    };
};

export const MouseMoveContext = createContext<MouseMoveState>({
    mouseDirection: _ => ({ x: 0, y: 0 }),
    mouseReverse: _ => ({ x: 0, y: 0 }),
});

export const MouseMoveProvider = ({ children }: MouseMoveProviderProps) => {
    const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
    const whileMouseMove = useCallback(e => {
        setCurrentPosition({
            x: e.clientX - window.innerWidth / 2,
            y: e.clientY - window.innerHeight / 2,
        });
    }, []);

    const mouseDirection = useMemo(() => {
        return (main = 20) => ({
            x: currentPosition.x / main,
            y: currentPosition.y / main,
        });
    }, [currentPosition]);

    const mouseReverse = useMemo(() => {
        return (main = 20) => ({
            x: (currentPosition.x / main) * -1,
            y: (currentPosition.y / main) * -1,
        });
    }, [currentPosition]);

    useEffect(() => {
        window.addEventListener('mousemove', whileMouseMove);
        return () => {
            window.removeEventListener('mousemove', whileMouseMove);
        };
    }, [whileMouseMove]);

    const param = useMemo(
        () => ({
            mouseDirection,
            mouseReverse,
        }),
        [mouseDirection, mouseReverse]
    );

    return (
        <MouseMoveContext.Provider value={param}>{children}</MouseMoveContext.Provider>
    );
};

export const useMouseMoveUI = () => useContext(MouseMoveContext);
