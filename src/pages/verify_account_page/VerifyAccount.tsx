import AuthAPI from '@/apis/auth/auth'
import MegaLoading from '@/components/ui/mega-loading'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

const VerifyAccount = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { email, token } = Object.fromEntries([...searchParams])
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    AuthAPI.verifyAccount({ email, token })
      .then((_response) => {
        toast.success('Account verified successfully')
        setVerified(true)
      })
      .catch((error) => {
        if (error.response.data.message === 'Account already verified') {
          setVerified(true)
        }
        navigate('/404')
      })
  }, [email, token])

  if (!email || !token) {
    return <Navigate to={'/404'} />
  }

  if (!verified) {
    return (
      <MegaLoading
        content={<span className='text-white text-base md:text-lg font-bold'>Verifying your account...</span>}
      />
    )
  }

  return <Navigate to={'/login'} />
}

export default VerifyAccount
