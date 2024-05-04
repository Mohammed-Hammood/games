import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
    children: React.ReactNode;
    id?: string;
    className?: string;
}

export function Portal({ children, className, id }: Props): JSX.Element | null {
    const [container, setContainer] = useState<null | HTMLDivElement>(null);

    useEffect(() => {

        const el = document.createElement("div");

        if(className)el.setAttribute("class", className);

        if (id) el.setAttribute("id", id);

        document.body.appendChild(el);

        document.body.style.overflow = "hidden";

        setContainer(el);

        return () => {

            document.body.style.overflow = "auto";

            if(id && document.getElementById(id) !== null)document.body.removeChild(el);
            
            setContainer(null);
        }

    }, [id, className]);

    return container ? createPortal(children, container) : null;
}