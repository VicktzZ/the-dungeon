import type React from "react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <box
            width='100%'
            height='100%'
            align="center"
            valign="middle"
            padding={{ top: 1, left: 1 }}
            border='line'
            label="The Dungeon"
            style={{
                border: { fg: 'gray' }
            }}
            
        >
            {children}
        </box>
    )
}