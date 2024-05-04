import { FormEvent, useCallback, useId, useState } from 'react';
import cls from "./modal.module.scss";
import { Portal } from 'components/portal';
import { IoIosClose } from 'react-icons/io';


interface Props {
    isOpen: boolean;
    close: () => void;
}

export function Modal({ isOpen, close }: Props) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const modalId = useId();

    const onClose = useCallback((): void => {

        document.getElementById(modalId)?.classList.add(cls.closing);
        const interval = setTimeout(() => {
            clearInterval(interval);
            close();

        }, 500);
    }, [modalId, close])

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password && email) {
            close();
        }
    }
    return (
        isOpen ?
            <Portal id={modalId} className={cls.wrapper}>
                <div className={cls.wrapper} >
                    <div className={cls.container}>
                        <IoIosClose className={cls.close} onClick={onClose} />
                        <form className={cls.formModal} onSubmit={submitHandler}>
                            <input
                                value={email}
                                type="text"
                                required={true}
                                className={cls.inputModal}
                                placeholder="Email"
                                onChange={e => setEmail((e.target as HTMLInputElement).value)}
                            />
                            <input
                                value={password}
                                type="text"
                                required={true}
                                className={cls.inputModal}
                                placeholder="Password"
                                onChange={e => setPassword((e.target as HTMLInputElement).value)}
                            />
                            <button className={cls.buttonModal}>Sign in</button>
                        </form>
                    </div>
                </div >
            </Portal> : null
    )
}