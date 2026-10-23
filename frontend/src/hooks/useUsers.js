import { useEffect, useState } from "react"
import axios from "axios"

export default function useUsers() {
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {

        axios.get('/api/users')
            .then((res) => {
                let userArr = []
                for (res of res.data) {
                    userArr.push(res)
                }
                setAllUsers(userArr)

            })
    }, [])
    return { allUsers, setAllUsers }
}