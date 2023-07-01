import React, {FC} from 'react';
import './CardPrincipal.scss';
import Widget from "../Widget/Widget";

interface CardProps {
    allData: number;
    mostDemandedZone: number;
    lessDemandedZone: number;
    zone1: string;
    zone2: string;
    zone3: string;
    zone4: string;
}
const CardPrincipal:FC<CardProps> = ({allData,mostDemandedZone,lessDemandedZone,zone1,zone2,zone3,zone4}) => {
    return (
        <>
            <div className="card-principal">
                <Widget title="Cantidad de datos" data={allData} />
                <Widget title="Zona mas demandada" data={mostDemandedZone} variant="primary"/>
                <Widget title="Zona menos demandada" data={lessDemandedZone} variant="secondary"/>
            </div>
            <div className="card-principal zones">
                <Widget title="Zona 1" data={zone1} variant="zones"/>
                <Widget title="Zona 2" data={zone2} variant="zones"/>
                <Widget title="Zona 3" data={zone3} variant="zones"/>
                <Widget title="Zona 4" data={zone4} variant="zones"/>
            </div>
        </>
    );
};

export default CardPrincipal;
