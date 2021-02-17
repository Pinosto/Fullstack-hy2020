import { useState, useEffect } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(baseUrl)
                //console.log(response.data)
                setResources(response.data)
            } catch (e) {
                console.error(e)
            }
        }
        fetch()
    }, [baseUrl])

    const create = async (resource) => {
        const response = await axios.post(baseUrl, resource)
        setResources([...resources, response.data])
    }

    const service = {
        create
    }

    return [resources, service]
}

