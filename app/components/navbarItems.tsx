'use client'

import { NavbarItem } from '@nextui-org/navbar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavbarItems() {
  const pathname = usePathname()
  return (
    <>
      <NavbarItem isActive={pathname === '/'}>
        <Link href="/">Главная</Link>
      </NavbarItem>
      <NavbarItem isActive={pathname === '/about'}>
        <Link href="/about">О проекте</Link>
      </NavbarItem>
    </>
  )
}
