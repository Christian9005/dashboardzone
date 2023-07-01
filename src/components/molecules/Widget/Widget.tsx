import React, {FC} from 'react';
import './Widget.scss';
interface WidgetProps{
    title: string;
    data: number | string;
    variant?: 'default' | 'primary' | 'secondary' | 'zones' | 'a' | 'b' | 'c';
}
const Widget:FC<WidgetProps> = ({title, data, variant = 'default'}) => {
    const widgetClassName = `widget ${variant}`

    return (
        <div className={widgetClassName}>
            <h2 className="widget--tittle">{title}</h2>
            <p className="widget--content">{data}</p>
        </div>
    );
};

export default Widget;
