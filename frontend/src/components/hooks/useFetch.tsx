import { useState, useEffect } from 'react'
import { useAppDispatch } from 'store';
import { CustomError } from 'utils';
import { useNavigate } from 'react-router-dom';
import type { UnknownAction } from 'redux';


interface InitialRequest {
    method: MethodT;
    headers: Record<string, string>
    body?: any
}

type Props = {
    reducer?: (data: any) => UnknownAction;
    setData?: (data: any) => void;
    url?: string | null;
    showMessage?: boolean;
    condition?: ((res: any) => boolean) | boolean;
    headers?: any;
    method?: MethodT;
    throwError?: boolean;
    data?:any
};

export function useFetch(props: Props) {
    const [method, setMethod] = useState<MethodT>(props.method || "GET");
    const [data, setData] = useState<any>(props.data);
    const [url, setUrl] = useState<string | null | undefined>(props.url);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        const options: InitialRequest = {
            headers: { 'Content-Type': 'application/json', },
            method: method
        }


        if (data && ['POST', 'PUT', 'DELETE'].includes(method)) {
            options.body = JSON.stringify(data);
        }

        const sendRequest = async (url: string): Promise<void> => {
            try {
                const req = await fetch(url, options);
                if (req.status !== 200) {
                    throw new CustomError(req);
                }
                const res = await req.json();
                if (res && res.ok) {
                    const { reducer, setData } = props;

                    reducer && dispatch(reducer(res));

                    setData && setData(res);

                }
                else {
                    throw new CustomError({ ...req, statusText: res.message, status: res.status })
                }
            }
            catch (err: any) {


                if (err && err.status === 404) {
                    navigate("/404");
                }

            } finally {
                setLoading(false);
                setUrl(null);
            }
        }
        if (url && !loading) {
            setLoading(true);
            sendRequest(url);
        }
    }, [dispatch, url, loading, data, method, navigate, setUrl, setMethod, setLoading, props])
    return {
        loading,
        method,
        url,
        setUrl,
        setData,
        setMethod,
        setLoading,
    }
}