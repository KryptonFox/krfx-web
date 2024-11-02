import {
  Navbar as NUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/navbar'
import ThemeSwitcher from '@/app/components/themeSwitcher'
import NavbarItems from '@/app/components/navbarItems'

export default function Navbar() {
  return (
    <NUINavbar>
      <NavbarBrand className="text-3xl font-black">KRFX</NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItems />
        <NavbarItem className="flex">
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </NUINavbar>
  )
}