"use client"
import { useEffect, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { FaArrowsRotate } from "react-icons/fa6";
import { FaMagnifyingGlassPlus } from "react-icons/fa6";
import { FaMagnifyingGlassMinus } from "react-icons/fa6";
import cls from "./image-magnifier.module.scss";

type Props = {
    image: string | null;
    setImage: (image: string | null) => void;
}

export function ImageMagnifier({ image, setImage }: Props) {
    const [background, setBackground] = useState<"blur" | "dark">("blur");
    const [imageWidth, setImageWidth] = useState<number>(100);
    const [imageRotation, setImageRotation] = useState<number>(0);


    useEffect(() => {
        const body = document.body;
        image && (body.style.overflowY = 'hidden');

        document.onkeydown = function (e) {

            if (e.key === '-' || e.key === 'ArrowDown') {
                setImageWidth(Math.min(imageWidth - 5, 10));

                if (image) e.preventDefault();

            }

            else if (e.key === '+' || e.key === 'ArrowUp') {
                setImageWidth(Math.min(imageWidth + 5, 150))
                if (image) e.preventDefault();
            }
            else if (e.key === 'Escape') {
                setImage(null);
            }
            else if (e.key === 'Backspace') {
                setImageWidth(90)
            }
        }
        document.onwheel = function (e) {
            e.preventDefault();
            const zoomOut = imageWidth > 10 ? imageWidth - 5 : imageWidth
            const zoomIn = imageWidth < 150 ? imageWidth + 5 : imageWidth
            setImageWidth(e.deltaY < 0 ? zoomIn : zoomOut);
        }
        return () => {
            body.style.overflowY = 'auto';
        }

    }, [image, setImage, imageWidth, setImageWidth]);

    return (
        image ?
            <div className={cls[background]}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    alt="Image"
                    src={image}
                    className={cls.image}
                    width={imageWidth + "%"}
                    style={{ transform: `rotate(${imageRotation}deg)` }}
                    onClick={() => { setImage(null); document.body.style.overflowY = 'auto'; }}
                />
                <div className={cls.controllers}>
                    <div className={cls.buttons}>
                        <button
                            type="button"
                            onClick={() => setBackground(background === "blur" ? "dark" : "blur")}
                            title={('Blur background/dark background')}
                            className={cls.button}
                        >
                            <MdDarkMode />
                        </button>
                        <button
                            type="button"
                            onClick={() => setImageRotation(imageRotation + 90)}
                            title={("Rotate the image")}
                            className={cls.button}
                        >
                            <FaArrowsRotate />
                        </button>
                        <button
                            type="button"
                            onClick={() => setImageWidth(Math.max(10, imageWidth - 5))}
                            title={("Zoom out")}
                            className={cls.button}
                        >
                            <FaMagnifyingGlassMinus />
                        </button>
                        <button
                            type="button"
                            onClick={() => setImageWidth(Math.min(150, imageWidth + 5))}
                            title={("Zoom in")}
                            className={cls.button}
                        >
                            <FaMagnifyingGlassPlus />
                        </button>
                    </div>

                </div>
            </div> : null
    )
}