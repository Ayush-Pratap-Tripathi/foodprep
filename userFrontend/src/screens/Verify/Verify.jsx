import './Verify.css'
import { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import Loader from '../../components/Loader/Loader'

const Verify = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const { url } = useContext(StoreContext)
    const navigate = useNavigate()

    const verifyPayment = async () => {
        try {
            const response = await axios.post(url + "/api/order/verify", { success, orderId })
            navigate("/myorders")
        } catch (error) {
            navigate('/')
        }

    }

    useEffect(() => {
        verifyPayment()
    }, [])

    return (
        <Loader />
    )
}

export default Verify