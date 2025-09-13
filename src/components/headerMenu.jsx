import LanguageSwitcher from "./languageSwitcher";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { Menu } from 'lucide-react';

export function HeaderMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Menu className="w-7 h-7 text-white cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44" align="start">
                <DropdownMenuItem className="flex justify-center items-center">
                    <LanguageSwitcher />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    Dokumentaatio
                </DropdownMenuItem>
                <DropdownMenuItem>
                    Palaute
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default HeaderMenu;