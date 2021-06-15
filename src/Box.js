import React from "react";
import {
    Card,
    CardContent, Typography
} from "@material-ui/core";
import './Box.css';
import { preetifyValue } from './utils.js';



function Box({ title, active, total, selectedItem, onClick, redColor }) {
    return (
        <Card onClick={onClick} className={`Box ${selectedItem && 'infoBox--selected'} ${redColor && 'infoBox--red'}`}>
            <CardContent>
                <Typography className="Box_title">
                    {title}
                </Typography>
                <h2 className="Box_cases"><strong>{preetifyValue(active)}</strong></h2>
                <Typography className="Box__total">
                    <p>Total: {preetifyValue(total)}</p>
                </Typography>
            </CardContent>
        </Card >
    );
}



export default Box;