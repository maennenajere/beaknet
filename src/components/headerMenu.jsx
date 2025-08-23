import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import SurveyButton from "./surveyButton";
import { Menu } from 'lucide-react';

export function HeaderMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Menu className="w-7 h-7 text-white cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>Beaky</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Lorem ipsum dolor
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Lorem ipsum dolor
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Lorem ipsum dolor
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Lorem ipsum dolor
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Lorem ipsum dolor
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            Lorem ipsum dolor
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>1</DropdownMenuItem>
                                <DropdownMenuItem>2</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>3</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem>
                        Lorem ipsum dolor
                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    Lorem ipsum dolor
                </DropdownMenuItem>
                <DropdownMenuItem>
                    Lorem ipsum dolor
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                    Lorem ipsum dolor
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem className="flex justify-center items-center">
                    <SurveyButton />
                </DropdownMenuItem> */}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default HeaderMenu;