'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const { data: session } = useSession();
  
  const [providers, setProviders] = useState<any | null>(null);
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    getData();
  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3' >
      <Link href="/" className='flex gap-2 flex-center' >
        <Image width={30} height={30} className='object-contain' src="/assets/images/logo.svg" alt='Promptopia logo' />
        <p className='logo_text' >Promptopia</p>
      </Link>

      {/* Desktop navigation */}
      <div className='sm:flex hidden' >
        {
          session?.user ? (
            <div className='flex gap-3  md:gap-5' >
              <Link href="/create-prompt" className='black_btn' >
                Create Post
              </Link>
              <button className='outline_btn' type='button' onClick={() => signOut()} >
                Sign Out
              </button>
              <Link href="/profile" >
                <Image width={37} height={37} className='rounded-full' src={session.user.image ?? ''} alt='profile' />
              </Link>
            </div>
          ) : (
            <>
              {
                providers && Object.values(providers).map((provider: any) => (
                  <button className='black_btn' type='button' key={provider.name} onClick={() => signIn(provider.id)} >
                    Sign In
                  </button>
                ))
              }
            </>
          )}
      </div>

      {/* Mobile navigation */}
      <div className='sm:hidden flex relative'>
        {
          session?.user ? 
            (
              <div className='flex'>
                <Image 
                  onClick={() => setToggleDropdown((prevValue) => !prevValue)} 
                  width={37} 
                  height={37} 
                  className='rounded-full' 
                  src={session.user.image ?? ''}
                  alt='profile' 
                />

                {toggleDropdown && (
                  <div className='dropdown' >
                    <Link 
                      href="/profile" 
                      className='dropdown_link' 
                      onClick={() => setToggleDropdown(false)} 
                    >
                      My Profile
                    </Link>
                    <Link 
                      href="/create-prompt" 
                      className='dropdown_link' 
                      onClick={() => setToggleDropdown(false)} 
                    >
                      Create Prompt
                    </Link>
                    <button
                      type='button'
                      onClick={() => {
                        setToggleDropdown(false);
                        signOut();
                      }}
                      className='mt-5 w-full black_btn'
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) :
            (
              <>
                {
                  providers && Object.values(providers).map((provider: any) => (
                    <button className='black_btn' type='button' key={provider.name} onClick={() => signIn(provider.id)} >
                    Sign In
                    </button>
                  ))
                }
              </>
            )
        }
      </div>
    </nav>
  );
};

export default Nav;