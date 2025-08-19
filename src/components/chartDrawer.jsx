import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function chartDrawer() {
    return (
        <Drawer>
            <DrawerTrigger className="bg-neutral-900 hover:bg-neutral-800 text-white font-semibold py-2 px-5 rounded-lg border border-neutral-700 shadow-md transition-colors duration-200">Avaa</DrawerTrigger>
            <DrawerContent className="bg-neutral-800 p-4 rounded-md">
                <DrawerHeader>
                    <DrawerTitle className="text-lg font-semibold text-gray-300 mb-1">Lorem ipsum</DrawerTitle>
                    <DrawerDescription>
                        <Card className="mb-10">
                            <p className="text-sm text-gray-400">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis doloremque quis similique blanditiis impedit optio laborum earum dolor voluptates ab. Doloremque nesciunt, reiciendis at dolores voluptatum sunt ex dolore perferendis?</p>
                        </Card>
                        <Card className="mb-2">
                            <p className="text-sm text-gray-400">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis doloremque quis similique blanditiis impedit optio laborum earum dolor voluptates ab. Doloremque nesciunt, reiciendis at dolores voluptatum sunt ex dolore perferendis?</p>
                        </Card>
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <DrawerClose>
                        <Button variant="outline" className="mt-2">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}