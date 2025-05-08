"use client";

import { ComponentProps } from "react";
import { Checkbox } from "./ui/checkbox";

export const ClientCheckbox = (props: ComponentProps<typeof Checkbox>) => {
    return (
        <Checkbox
            {...props}
            onCheckedChange={() => console.log("Checked changed")}
        />
    );
};
