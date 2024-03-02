import { useEffect, useState } from "react";

export default function useFetch(uri : string) {
    const [data, setData] = useState<any>(null)
    async function FetchData() {
        setData(null)
        try {
            const feting = await fetch(uri)
            if(feting.ok == false) return setData(null)
            const json = await feting.json()
            console.log(json)
            setData(json.data)
        }catch(err) {
            console.log(err)
            setData(null)
        }
    }
    useEffect(() => {
        FetchData()
    }, [uri])

    return [data, FetchData]

}