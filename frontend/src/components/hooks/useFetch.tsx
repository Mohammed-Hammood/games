import { useState, useEffect } from 'react'
import { useAppDispatch } from 'store';
import { CustomError } from 'utils';
import { useNavigate } from 'react-router-dom';
import type { UnknownAction } from 'redux';
import { toast, Bounce } from 'react-toastify';

interface InitialRequest {
    method: MethodT;
    headers: Record<string, string>
    body?: any
}

type Props = {
    reducer?: (data: any) => UnknownAction;
    setData?: (data: any) => void;
    url?: string | null;
    method?: MethodT;
    data?: any
};

// useFetch fetches data only when you pass url to it by setURL or in the props
export function useFetch(props: Props) {
    const [method, setMethod] = useState<MethodT>(props.method || "GET");
    const [data, setData] = useState<any>(props.data);
    const [url, setUrl] = useState<string | null | undefined>(props.url);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | { status: number, text: string }>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        const options: InitialRequest = {
            headers: { 'Content-Type': 'application/json'},
            method: method
        }


        if (data && ['POST', 'PUT', 'DELETE'].includes(method)) {
            options.body = JSON.stringify(data);
        }

        const sendRequest = async (url: string): Promise<void> => {
            setLoading(true);

            try {
                const req = await fetch(url, options);
                
                if (!req.ok) {
                    throw new CustomError(req);
                }
                const res = await req.json();
                
                if (res && res.ok) {
                    const { reducer, setData } = props;

                    reducer && dispatch(reducer(res));

                    setData && setData(res);

                }
                else {
                    throw new CustomError({
                        ...req,
                        statusText: res.error,
                        status: res.status || req.status,
                    })
                }
            }
            catch (err: any) {

                const text: string = err['message'] || err["statusText"] || err['error'] || "Semething went wrong";

                toast.error(text, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                    transition: Bounce,
                });

                setError({text, status: err.status });

            } finally {
                setLoading(false);
                setUrl(null);
            }
        }

        if (url && !loading) {
            setError(null);
            sendRequest(url);
        }

    }, [dispatch, url, loading, data, method, navigate, setUrl, setMethod, setLoading, props, setError])
    
    return {
        loading,
        method,
        url,
        error,
        setError,
        setUrl,
        setData,
        setMethod,
        setLoading,
    }
}