import { useEffect, useState } from "react";
import axios from "axios"

const useAxios = (param)=>{
    const [response,setResponse] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState("")


    const fetchData = async (url)=>{
        try {
            setIsLoading(true)
            const res = await axios.get(url)
            setResponse(res.data.results)
        } catch (error) {
            setError(error)
        }finally{
            setIsLoading(false)

        }
    }

    useEffect(()=>{
        fetchData(param)
    },[param])

    return{
        response,
        isLoading,
        error,
        fetchData: url => fetchData(url)
    }
}   

export default useAxios