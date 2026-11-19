import { useState } from 'react'
import bannerDesktop from '../assets/banner-desktop.png'
import bannerMobile from '../assets/banner-mobile.png'
import logo from '../assets/logo.png'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ email: '', password: '' })

  const handleSubmit = (e) => {
    e.preventDefault()

    let newErrors = { email: '', password: '' }
    let isValid = true

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      newErrors.email = 'Email tidak boleh kosong'
      isValid = false
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Format email tidak valid'
      isValid = false
    }

    if (!password) {
      newErrors.password = 'Password tidak boleh kosong'
      isValid = false
    } else if (password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter'
      isValid = false
    }

    setErrors(newErrors)

    if (isValid) {
      const loginData = {
        email: email,
        loginAt: new Date().toISOString()
      }
      localStorage.setItem('talenavi_user', JSON.stringify(loginData))
      alert('Login berhasil!')
    }
  }

  return (
    <div className="min-h-screen font-poppins relative flex items-center justify-center lg:bg-bg-desktop lg:p-4">
      
      {/* Background Mobile & Overlay */}
      <div className="absolute inset-0 block lg:hidden">
        <img 
          src={bannerMobile} 
          alt="Background Mobile" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Kartu Desktop */}
      <div className="hidden lg:flex bg-white w-full max-w-[1300px] min-h-[85vh] rounded-[2rem] shadow-lg overflow-hidden z-10">
        <div className="w-[58%] relative">
          <img src={bannerDesktop} alt="Banner Desktop" className="w-full h-full object-cover" />
        </div>

        <div className="w-full lg:flex-1 p-12 flex flex-col justify-center items-center bg-white">
          <FormContent 
            email={email} setEmail={setEmail} 
            password={password} setPassword={setPassword} 
            errors={errors} handleSubmit={handleSubmit} 
            isMobile={false} 
          />
        </div>
      </div>

      {/* Form Mobile (Tanpa Kartu Putih) */}
      <div className="relative z-10 w-full max-w-[350px] p-6 lg:hidden">
        <FormContent 
          email={email} setEmail={setEmail} 
          password={password} setPassword={setPassword} 
          errors={errors} handleSubmit={handleSubmit} 
          isMobile={true} 
        />
      </div>

    </div>
  )
}

function FormContent({ email, setEmail, password, setPassword, errors, handleSubmit, isMobile }) {
  // Kelas dinamis untuk input agar selalu putih solid dan teksnya jelas
  const inputClass = (errorField) => `
    w-full px-4 py-3 border rounded-xl outline-none transition-all text-sm text-gray-900 placeholder-gray-500 bg-white
    ${errorField 
      ? 'border-red-500' 
      : isMobile 
        ? 'border-transparent' 
        : 'border-gray-200 focus:ring-1 focus:ring-brand focus:border-brand'
    }
  `

  return (
    <div className="w-full">
      
      <div className="flex flex-col items-center mb-8">
        <img 
          src={logo} 
          alt="Logo" 
          className="w-[110px] h-[110px] object-contain mb-4" 
        />
        <h1 className={`font-semibold text-center drop-shadow-xl ${isMobile ? 'text-2xl text-white' : 'text-xl text-gray-800'}`}>
          Selamat Datang Kembali!
        </h1>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        
        <div>
          <label className={`block text-xs font-medium mb-1 ${isMobile ? 'text-white' : 'text-gray-700'}`}>Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email" 
            className={inputClass(errors.email)} 
          />
          {errors.email && <p className={`text-xs mt-1 font-medium ${isMobile ? 'text-red-400' : 'text-red-600'}`}>{errors.email}</p>}
        </div>

        <div>
          <label className={`block text-xs font-medium mb-1 ${isMobile ? 'text-white' : 'text-gray-700'}`}>Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password" 
            className={inputClass(errors.password)} 
          />
          {errors.password && <p className={`text-xs mt-1 font-medium ${isMobile ? 'text-red-400' : 'text-red-600'}`}>{errors.password}</p>}
        </div>

        <div className="flex justify-end pt-2">
          <a href="#" className={`text-xs underline transition-colors ${isMobile ? 'text-white hover:text-gray-300' : 'text-gray-700 hover:text-brand'}`}>
            Lupa Password?
          </a>
        </div>

        <button 
          type="submit" 
          className="w-full bg-brand text-white font-medium py-3 rounded-xl hover:bg-brand-hover transition-colors mt-2"
        >
          Sign In
        </button>
      </form>

      <div className="mt-8 text-center text-sm">
        <span className={isMobile ? 'text-blue-400' : 'text-blue-600'}>Belum punya akun? </span>
        <a href="#" className={`underline font-medium ${isMobile ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-700'}`}>
          Daftar di sini
        </a>
      </div>
    </div>
  )
}