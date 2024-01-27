import React, { FormEventHandler } from 'react'

type CardProps = {
    onSubmit: FormEventHandler
}

const Card: React.FC<CardProps> = ({ onSubmit }) => {
    return (
        <div className='flex flex-col justify-center items-center bg-primary p-[32px] rounded-[20px] z-10'>
            <header className='flex items-center flex-col pb-6'>
                <h2 className='text-white text-[24px] font-bold'>Witamy ponownie!</h2>
                <h4 className='text-[16px] text-light-gray'>Cieszymy się, że znowu z nami jesteś!</h4>
            </header>
            <form onSubmit={onSubmit} className='flex flex-col w-full'>
                <label htmlFor="email" className='font-bold text-light-gray mb-2 text-[12px]'>ADRES E-MAIL <sup className='text-red-500'>*</sup></label>
                <input type="text" id='email' required className='bg-secondary text-white w-[414px] h-[40px] rounded-sm mb-4 outline-none p-3' />
                <label htmlFor="password" className='font-bold text-light-gray mb-2 text-[12px]'>HASŁO</label>
                <input type="password" id='password' required className='bg-secondary text-white w-[414px] h-[40px] rounded-sm mb-2 outline-none p-3' />
                <a href="" className='text-[14px] text-link-blue font-semibold'>Nie pamiętasz hasła?</a>
                <button type='submit' className='w-full bg-blue text-white h-[44px] rounded-sm font-semibold mb-2 mt-6'>Zaloguj się</button>
                <p className='text-[14px] text-light-gray'>Potrzebujesz konta?
                    <a href="" className='text-link-blue mx-2 text-[14px] font-semibold'>Zarejestruj się</a>
                </p>
            </form>
        </div>
    )
}

export default Card