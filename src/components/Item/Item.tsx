import React, {ReactNode} from 'react';

type Props = {
    children: ReactNode
}

export const Item = (props: Props) => {
    return <li >{props.children}</li>
};