import React from 'react';

interface AccountManuProps {
    visible?: boolean;
}
const handleSignOut = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
};

const AccountManu: React.FC<AccountManuProps> = ({ visible }) => {
    if (!visible) {
        return null;
    }
    return (
        <div className='bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex'>
            <div className='flex flex-col gap-3'>
                <div className='px-3 group/item flex flex-row gap-3 items-center w-full'>
                    <img src="/images/Netflix-avatar.png" alt="Profile" className='w-8 h-8 rounded-md' />
                    <p className='text-white text-sm group-hover/item:underline'>Profile</p>
                </div>
                <hr className='bg-gray-600 border-0 h-px my-4' />
                <div  onClick={handleSignOut} className='px-3 text-center text-white hover:underline'>
                   Sign out of Netflix
                </div>
            </div>
        </div>
    )
}

export default AccountManu;